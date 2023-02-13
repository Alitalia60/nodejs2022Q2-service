import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
// import { FavoritesModule } from './favorites/favorites.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configDoc = new DocumentBuilder()
    .setTitle('REST-SERVICE')
    .setDescription('The rest-service API')
    .setVersion('1.0')
    .build();

  const documentDoc = SwaggerModule.createDocument(app, configDoc, {
    include: [
      UserModule,
      ArtistModule,
      AlbumModule,
      TrackModule,
      // FavoritesModule,
    ],
  });
  SwaggerModule.setup('doc', app, documentDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
