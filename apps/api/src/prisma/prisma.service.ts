import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/libs/prisma';

@Injectable()
export class PrismaService extends PrismaClient {}
