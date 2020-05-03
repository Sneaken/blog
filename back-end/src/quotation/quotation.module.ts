import { HttpModule, Module } from '@nestjs/common';
import { QuotationController } from './controllers/quotation.controller';
import { QuotationService } from './services/quotation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotationSchema } from './schemas/quotation.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Quotation', schema: QuotationSchema }]),
  ],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
