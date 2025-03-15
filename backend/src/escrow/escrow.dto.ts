import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FundEscrowDto {
  @IsNotEmpty() @IsString() jobId: string;
  @IsNotEmpty() @IsString() clientId: string;
  @IsNotEmpty() @IsString() freelancerId: string;
  @IsNotEmpty() @IsNumber() amount: number;
}

export class ReleaseEscrowDto {
  @IsNotEmpty() @IsString() escrowId: string;
  @IsNotEmpty() @IsString() clientId: string;
}

export class RefundEscrowDto {
  @IsNotEmpty() @IsString() escrowId: string;
  @IsNotEmpty() @IsString() clientId: string;
}
