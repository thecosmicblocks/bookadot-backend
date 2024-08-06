import { BadRequestException } from '@nestjs/common';
import { keccak256 } from 'js-sha3';

/**
 * Validates and converts an Ethereum address to its checksummed format.
 * @param address The Ethereum address to validate and checksum.
 * @returns The checksummed Ethereum address.
 * @throws Error if the address is invalid.
 */
export function getAddress(address: string): string {
  if (!address || typeof address !== 'string') {
    throw new BadRequestException('Invalid address');
  }

  // Remove the '0x' prefix if present
  const cleanAddress = address.toLowerCase().replace(/^0x/, '');

  // Check if the address has the correct length (40 characters)
  if (cleanAddress.length !== 40) {
    throw new BadRequestException('Invalid address length');
  }

  // Hash the address using Keccak256
  const hash = keccak256(cleanAddress);

  // Apply the checksum based on the hash
  let checksumAddress = '0x';
  for (let i = 0; i < cleanAddress.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      checksumAddress += cleanAddress[i].toUpperCase(); // Uppercase for hashed values >= 8
    } else {
      checksumAddress += cleanAddress[i]; // Lowercase otherwise
    }
  }

  return checksumAddress;
}
