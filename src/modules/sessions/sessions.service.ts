import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(TheatreEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async seed(): Promise<void> {
    const theatres = await this.theatreRepository.find();

    for (const theatre of theatres) {
      const sessionCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 sessions
      const movies = await this.movieRepository.find();

      let previousEndTime = dayjs().set('hour', 10).set('minute', 0); // First session starts at 10:00 AM

      for (let i = 0; i < sessionCount; i++) {
        const movie = movies[Math.floor(Math.random() * movies.length)];

        // Start time is 10 minutes after the previous session's end time
        const startTime = previousEndTime.add(10, 'minute').toDate();
        const endTime = dayjs(startTime).add(movie.duration, 'minute').toDate();

        const session = this.sessionRepository.create({
          format: MOVIE_FORMAT.TWO_D, // default format
          language: 'English', // default language
          startTime,
          endTime,
          movie,
          theatre,
        });

        await this.sessionRepository.save(session);
        await this.seedTicketsForSession(session);

        previousEndTime = dayjs(endTime); // Update the end time for the next session
      }
    }
  }
}
