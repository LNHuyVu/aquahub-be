import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { join } from 'path';

import { existsSync, mkdirSync, unlinkSync } from 'fs';

export interface ProcessedImageResult {
  url: string;
  thumbnailUrl: string;
  filename: string;
  width: number;
  height: number;
  size: number;
}

@Injectable()
export class ImageProcessingService {
  private readonly logger = Logger.name;
  private readonly uploadDir = join(process.cwd(), 'uploads');

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async processImage(
    file: Express.Multer.File,
    baseUrl: string,
  ): Promise<ProcessedImageResult> {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const mainFilename = `img-${uniqueSuffix}.webp`;
    const thumbFilename = `thumb-${uniqueSuffix}.webp`;

    const mainPath = join(this.uploadDir, mainFilename);
    const thumbPath = join(this.uploadDir, thumbFilename);

    // Process main image (max 1920px width/height, converted to webp, quality 80%)
    const mainImageInfo = await sharp(file.path || file.buffer)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(mainPath);

    // Process thumbnail image (max 400px width/height)
    await sharp(file.path || file.buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(thumbPath);

    // Clean up temporary file if saved to disk by multer
    if (file.path && existsSync(file.path) && file.path !== mainPath) {
      try {
        unlinkSync(file.path);
      } catch (err) {
        // ignore cleanup error
      }
    }

    return {
      url: `${baseUrl}/uploads/${mainFilename}`,
      thumbnailUrl: `${baseUrl}/uploads/${thumbFilename}`,
      filename: mainFilename,
      width: mainImageInfo.width || 0,
      height: mainImageInfo.height || 0,
      size: mainImageInfo.size || 0,
    };
  }
}
