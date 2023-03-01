import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { dataSourseConfig } from './DataBase/data-source';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { DtoValidateModule } from './validators/auth-dto-validate.module';
import { MessageModule } from './messageHandlers/message.module';
import { LoggingMiddlewareService } from './loggers/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourseConfig }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
    DtoValidateModule,
    MessageModule,
  ],
  // controllers: [AppController, AuthController],
  controllers: [AuthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddlewareService).forRoutes('*');
  }
}
