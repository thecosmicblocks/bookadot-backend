import { Injectable } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';

interface Signer {
  _signTypedData: (
    ...params: Parameters<ethers.providers.JsonRpcSigner["_signTypedData"]>
  ) => Promise<string>;
}

interface BookingConfig {
  chainId: number;
  bookadotPropertyAddress: string;
}

@Injectable()
export class BookingService {
  async generateBookingParam(
    bookingId: string,
    bookingAmount: BigNumber,
    signer: Signer,
    token: string,
    config: BookingConfig
  ): Promise<{ param: any, signature: string }> { // Replace `any` with `BookingParametersStruct` when available
    const oneDayDuration = 24 * 60 * 60 * 1000; // milliseconds

    let now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    let freeCancellationDate = new Date();
    freeCancellationDate.setTime(now.getTime() + oneDayDuration);
    let freeCancellationTimestamp = Math.round(freeCancellationDate.getTime() / 1000);

    let checkInDate = new Date();
    checkInDate.setTime(now.getTime() + 2 * oneDayDuration);
    let checkInTimestamp = Math.round(checkInDate.getTime() / 1000);

    let checkOutDate = new Date();
    checkOutDate.setTime(now.getTime() + 3 * oneDayDuration);
    let checkOutTimestamp = Math.round(checkOutDate.getTime() / 1000);

    const domain = {
      name: 'Bookadot',
      version: '1',
      chainId: config.chainId,
      verifyingContract: config.bookadotPropertyAddress,
    };

    const types = {
      BookingParameters: [
        { name: 'token', type: 'address' },
        { name: 'bookingId', type: 'string' },
        { name: 'checkInTimestamp', type: 'uint256' },
        { name: 'checkOutTimestamp', type: 'uint256' },
        { name: 'bookingExpirationTimestamp', type: 'uint256' },
        { name: 'bookingAmount', type: 'uint256' },
        { name: 'cancellationPolicies', type: 'CancellationPolicy[]' },
      ],
      CancellationPolicy: [
        { name: 'expiryTime', type: 'uint256' },
        { name: 'refundAmount', type: 'uint256' },
      ],
    };

    const data = {
      token: token,
      bookingId: bookingId,
      checkInTimestamp: checkInTimestamp,
      checkOutTimestamp: checkOutTimestamp,
      bookingExpirationTimestamp: checkInTimestamp,
      bookingAmount: bookingAmount,
      cancellationPolicies: [
        {
          expiryTime: freeCancellationTimestamp,
          refundAmount: bookingAmount,
        },
        {
          expiryTime: checkInTimestamp,
          refundAmount: bookingAmount.div(2),
        },
      ],
    };

    let signature = await signer._signTypedData(domain, types, data);

    return { param: data, signature: signature };
  }
}
