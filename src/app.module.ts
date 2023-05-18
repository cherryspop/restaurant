import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfigNest } from '../config/dbConnection';
import { DishService } from './services/dish/dish.service';
import { DishController } from './controllers/dish/dish.controller';
import { DishServiceModule } from './services/dish/dish.service.module';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryServiceModule } from './services/category/category.service.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { AuthModule } from './services/auth/auth.service.module';
import { UserModule } from './services/user/user.service.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../config/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './services/crypto/crypto.service';
import { UserController } from './controllers/user/user.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRoot(dataSourceConfigNest),
    DishServiceModule,
    CategoryServiceModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    JwtModule,
  ],
  controllers: [
    AppController,
    DishController,
    CategoryController,
    AuthController,
    UserController,
  ],
  providers: [
    AppService,
    DishService,
    CategoryService,
    AuthService,
    UserService,
    CryptoService,
  ],
})
export class AppModule {}
