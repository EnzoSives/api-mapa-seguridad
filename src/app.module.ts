import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { MarcadorSegModule } from './seguridad/marcador-seg/marcador-seg.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '179.43.127.133',
      port: 3306,
      username: 'insp_pruebas',
      password: '%#zn7ajqx0qrljLr',
      database: 'mapa-seguridad',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    MarcadorSegModule,
    
  ],
  controllers: [AppController],
  providers: [AppService , {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
