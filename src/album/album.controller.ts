/* eslint-disable prettier/prettier */
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Put, Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards, UseFilters } from '@nestjs/common';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../exeptions/http-exeptions.filter';

@ApiTags('album')
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter(AlbumController.name))
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  //!! -------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'List all albums' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  findAll() {
    return this.albumService.findAll();
  }

  //!! -------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Find album with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  //!! -------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Required data missing',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  //!! -------------------------------------------------
  @Put(':id')
  @ApiOperation({ summary: 'Change album with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Wrong password' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with specified id not found',
  })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  //!! -------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete album with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with id not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
