// import { BaseEntity, Repository } from 'typeorm';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
// import { BadRequestException } from '@nestjs/common';
// export class CustomRepository<T extends BaseEntity> extends Repository<T> {
//     async softDelete(id: string, deleted: boolean = true) {
//         return await this.updateRecord(id, { deleted } as any);
//       }
//       async findNotDeleted(id: string): Promise<T | undefined> {
//         return await super.findOne(id, { where: { deleted: false } });
//       }
//       async updateRecord(id: string, partialData: QueryDeepPartialEntity<T>) {
//         let { affectedRows } = (await super.update(id, partialData)).raw;
//         if (affectedRows < 1) throw new BadRequestException(`Record not found`);
//         return {
//           statusCode   : '00',
//           statusMessage: 'Success',
//         };
//       }
//     }
