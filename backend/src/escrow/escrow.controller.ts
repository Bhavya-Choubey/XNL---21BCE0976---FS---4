import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EscrowService } from './escrow.service';
import { FundEscrowDto, ReleaseEscrowDto, RefundEscrowDto } from './escrow.dto';

@Controller('escrow')
export class EscrowController {
  constructor(private escrowService: EscrowService) {}

  // ✅ Fund Escrow (Client deposits money)
  @UseGuards(AuthGuard('jwt'))
  @Post('fund')
  async fundEscrow(@Body() fundEscrowDto: FundEscrowDto) {
    return this.escrowService.fundEscrow(fundEscrowDto);
  }

  // ✅ Release Escrow (Client approves payment)
  @UseGuards(AuthGuard('jwt'))
  @Post('release')
  async releaseEscrow(@Body() releaseEscrowDto: ReleaseEscrowDto) {
    return this.escrowService.releaseEscrow(releaseEscrowDto);
  }

  // ✅ Refund Escrow (Client cancels contract)
  @UseGuards(AuthGuard('jwt'))
  @Post('refund')
  async refundEscrow(@Body() refundEscrowDto: RefundEscrowDto) {
    return this.escrowService.refundEscrow(refundEscrowDto);
  }

  // ✅ Get escrow status
  @Get('status/:jobId')
  async getEscrowStatus(@Param('jobId') jobId: string) {
    return this.escrowService.getEscrowStatus(jobId);
  }
}
