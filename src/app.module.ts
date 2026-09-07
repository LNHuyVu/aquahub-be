import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FishModule } from './modules/fish/fish.module';
import { PostsModule } from './modules/posts/posts.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { TanksModule } from './modules/tanks/tanks.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { AdsModule } from './modules/ads/ads.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ListingsModule } from './modules/listings/listings.module';
import { TrafficModule } from './modules/traffic/traffic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FishModule,
    PostsModule,
    QuestionsModule,
    TanksModule,
    ArticlesModule,
    UploadsModule,
    AdsModule,
    SettingsModule,
    ListingsModule,
    TrafficModule,
  ],
})
export class AppModule {}
