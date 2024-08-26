import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health-check')
@ApiTags('health-check')
export class HealthCheckController {
  constructor() {}

  @Get()
  check() {
    return "I'm aliveeeeeeeeeee!";
  }
}
