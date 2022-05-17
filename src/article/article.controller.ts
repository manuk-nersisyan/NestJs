import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { query } from "express";
import { get } from "http";
import { User } from "src/user/decorators/user.decoratot";
import { AuthGuard } from "src/user/guards/auth.guard";
import { UserEntity } from "src/user/user.entity";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/CreateArticle.dto";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";
import { ArticleResponseInterface } from "./types/articleResponse.interface";


@Controller('articles')
export class ArtcleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseInterface> {
        return await this.articleService.findAll(currentUserId, query);
    }

    @Get('feed')
    @UseGuards(AuthGuard)
    async getFeed(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseInterface> {
        return await this.articleService.getFeed(currentUserId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async create(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto
     ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(currentUser, createArticleDto);
        return this.articleService.buildArticleResponse(article)
    }

    @Get(':slug')
    async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(
         @User('id') currentUserId: number,
         @Param('slug') slug: string
         ) {
        return this.articleService.deleteArticle(slug, currentUserId);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto: CreateArticleDto
        ): Promise<ArticleResponseInterface> {
            const article = await this.articleService.updateArticle(
                slug, 
                updateArticleDto, 
                currentUserId);
            return this.articleService.buildArticleResponse(article)
    }

    @Post(':slug/favorite')
    @UseGuards(AuthGuard)
    async addArticleToFavorites(@User('id') currentUserId: number, @Param('slug') slug: string):
     Promise<ArticleResponseInterface> {
        const article = await this.articleService.addArticleToFavorites(slug, currentUserId);
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(':slug/favorite')
    @UseGuards(AuthGuard)
    async deleteArticleFromFavorites(@User('id') currentUserId: number, @Param('slug') slug: string):
     Promise<ArticleResponseInterface> {
        const article = await this.articleService.deleteArticleFromFavorites(slug, currentUserId);
        return this.articleService.buildArticleResponse(article);
    }
}