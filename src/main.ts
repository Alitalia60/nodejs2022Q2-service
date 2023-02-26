import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';

import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

dotenvConfig();
const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error'],
    // logger: new LoggingService(),

  });

  const configSwaggwDoc = new DocumentBuilder()
    .setTitle('REST-SERVICE')
    .setDescription('The rest-service API')
    .setVersion('1.0')
    .build();

  const documentDoc = SwaggerModule.createDocument(app, configSwaggwDoc, {
    include: [
      UserModule,
      ArtistModule,
      AlbumModule,
      TrackModule,
      FavoritesModule,
      AuthModule,
    ],
  });
  SwaggerModule.setup('doc', app, documentDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.useLogger(app.get(LoggingService));
  await app.listen(PORT, () => {

    console.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
