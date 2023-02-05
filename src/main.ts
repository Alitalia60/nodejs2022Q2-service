import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configUser = new DocumentBuilder()
    .setTitle('User')
    .setDescription('The user API')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const documentUser = SwaggerModule.createDocument(app, configUser, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/user', app, documentUser);

  const configArtist = new DocumentBuilder()
    .setTitle('Artist')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('artist')
    .build();

  const documentArtist = SwaggerModule.createDocument(app, configArtist, {
    include: [ArtistModule],
  });
  SwaggerModule.setup('api/artist', app, documentArtist);

  const configTrack = new DocumentBuilder()
    .setTitle('Track')
    .setDescription('The Track API')
    .setVersion('1.0')
    .addTag('track')
    .build();
  const documentTrack = SwaggerModule.createDocument(app, configTrack, {
    include: [TrackModule],
  });
  SwaggerModule.setup('api/track', app, documentTrack);

  const configAlbum = new DocumentBuilder()
    .setTitle('Album')
    .setDescription('The Album API')
    .setVersion('1.0')
    .addTag('album')
    .build();
  const documentAlbum = SwaggerModule.createDocument(app, configAlbum, {
    include: [AlbumModule],
  });
  SwaggerModule.setup('api/album', app, documentAlbum);

  const configFavs = new DocumentBuilder()
    .setTitle('Favorites')
    .setDescription('The Favorites API')
    .setVersion('1.0')
    .addTag('favs')
    .build();
  const documentFavs = SwaggerModule.createDocument(app, configFavs, {
    include: [FavoritesModule],
  });
  SwaggerModule.setup('api/favs', app, documentFavs);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(4000);
}
bootstrap();
