import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Escrow, EscrowDocument } from './escrow.schema';
import { FundEscrowDto, ReleaseEscrowDto, RefundEscrowDto } from './escrow.dto';

@Injectable()
export class EscrowService {
  constructor(@InjectModel(Escrow.name) private escrowModel: Model<EscrowDocument>) {}

  // ✅ Fund an escrow (Client deposits money)
  async fundEscrow(fundEscrowDto: FundEscrowDto): Promise<Escrow> {
    const { jobId, clientId, freelancerId, amount } = fundEscrowDto;

    // Check if escrow already exists for this job
    const existingEscrow = await this.escrowModel.findOne({ jobId });
    if (existingEscrow) throw new BadRequestException('Escrow already funded for this job');

    // Create escrow entry
    const escrow = new this.escrowModel({ jobId, clientId, freelancerId, amount, status: 'funded' });
    return escrow.save();
  }

  // ✅ Release escrow funds (Client approves payment)
  async releaseEscrow(releaseEscrowDto: ReleaseEscrowDto): Promise<Escrow> {
    const { escrowId, clientId } = releaseEscrowDto;

    const escrow = await this.escrowModel.findById(escrowId);
    if (!escrow) throw new NotFoundException('Escrow not found');
    if (escrow.clientId !== clientId) throw new BadRequestException('Unauthorized client');

    // Mark as released
    escrow.status = 'released';
    return escrow.save();
  }

  // ✅ Refund escrow (Client cancels contract)
  async refundEscrow(refundEscrowDto: RefundEscrowDto): Promise<Escrow> {
    const { escrowId, clientId } = refundEscrowDto;

    const escrow = await this.escrowModel.findById(escrowId);
    if (!escrow) throw new NotFoundException('Escrow not found');
    if (escrow.clientId !== clientId) throw new BadRequestException('Unauthorized client');

    // Mark as refunded
    escrow.status = 'refunded';
    return escrow.save();
  }

  // ✅ Get escrow status
  async getEscrowStatus(jobId: string): Promise<Escrow> {
    const escrow = await this.escrowModel.findOne({ jobId });
    if (!escrow) throw new NotFoundException('Escrow not found');
    return escrow;
  }
}
