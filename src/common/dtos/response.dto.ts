import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class SuccessResponseDto {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly msg: string;

  @ApiProperty()
  readonly data: any;

  constructor(data?: any) {
    this.status = HttpStatus.OK;
    this.msg = 'OK';
    if (data) {
      this.data = data;
    }
  }
}

export class SuccessResponseWithPaginateDto {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly msg: string;

  @ApiProperty()
  readonly data: any;

  @ApiProperty()
  readonly pageIndex: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly totalItems: number;

  constructor(data?: any) {
    this.status = HttpStatus.OK;
    this.msg = 'OK';
    if (data) {
      this.data = data.result;
      this.pageIndex = parseInt(data.pageIndex);
      this.pageSize = parseInt(data.pageSize);
      this.totalItems = data.totalItems;
    }
  }
}

export class ErrorResponseDto {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly msg: string;

  constructor() {
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.msg = 'Internal Server Error!';
  }
}

export class NotFoundResponseDto {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly msg: string;

  constructor(message = null) {
    this.status = HttpStatus.NOT_FOUND;
    this.msg = message ? message : "Can't find a response valid!";
  }
}
