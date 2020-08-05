import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'projectflow',
    autoLoadEntities: true,
    logging: true,
    // entities: ["entities/*.js"],
    synchronize: false,
  }),
    ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
