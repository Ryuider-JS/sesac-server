import { InjectRepository } from '@nestjs/typeorm';
import { BoardComment } from './entities/board-comment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class BoardCommentRepository {
    constructor(
        @InjectRepository(BoardComment)
        private readonly boardCommentRepository: MongoRepository<BoardComment>,
    ) {}

    async findComment(id: string) {
        return await this.boardCommentRepository.findOne({
            where: { _id: new ObjectId(id) },
        });
    }

    createComment(
        boardId: number,
        { author, password, content, rating, parentId }: CreateBoardCommentDto,
    ): BoardComment {
        return this.boardCommentRepository.create({
            author,
            password,
            content,
            rating,
            boardId,
            parentId: parentId || null,
        });
    }

    async saveComment(comment: BoardComment): Promise<BoardComment> {
        return await this.boardCommentRepository.save(comment);
    }

    async findAllComment(boardId: number): Promise<BoardComment[]> {
        return await this.boardCommentRepository.find({ where: { boardId } });
    }

    async updateComment(commentId: string, updateBoardCommentDto) {
        const updateBoardDB = await this.boardCommentRepository.update(
            new ObjectId(commentId),
            updateBoardCommentDto,
        );
        if (updateBoardDB.affected === 0) {
            throw new NotFoundException(
                `commentId: ${commentId} is not update`,
            );
        }
    }
}
