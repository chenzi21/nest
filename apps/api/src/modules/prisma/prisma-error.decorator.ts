import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@tools/prisma/generated/client';

export function HandleTransformPrismaError() {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2025':
              throw new NotFoundException('Record not found');
            default:
              throw error;
          }
        }
        throw error;
      }
    };

    return descriptor;
  };
}
