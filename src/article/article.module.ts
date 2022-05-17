import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowEntity } from "src/profile/follow.entity";
import { UserEntity } from "src/user/user.entity";
import { ArtcleController } from "./article.controller";
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity])],
    controllers: [ArtcleController],
    providers: [ArticleService],
})
export class ArticleModule {}