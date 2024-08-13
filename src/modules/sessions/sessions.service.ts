import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './entities/session.entity';
import { TheatresService } from '../theatres/theatres.service';
import * as dayjs from 'dayjs';
import { MOVIE_FORMAT } from 'src/constants';
import { MovieService } from '../movies/movie.service';
import { SeatService } from '../seats/seat.service';
@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly theatresService: TheatresService,
    private readonly movieService: MovieService,
    private readonly seatService: SeatService,
  ) {}

  async seed(): Promise<void> {
    const theatres = await this.theatresService.getAllTheatres();

    for (const theatre of theatres) {
      const sessionCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 sessions
      const movies = await this.movieService.getAllMovies();

      let previousEndTime = dayjs().set('hour', 10).set('minute', 0); // First session starts at 10:00 AM

      for (let i = 0; i < sessionCount; i++) {
        const movie = movies[Math.floor(Math.random() * movies.length)];

        // Start time is 10 minutes after the previous session's end time
        const startTime = previousEndTime.add(10, 'minute').toDate();
        const endTime = dayjs(startTime).add(120, 'minute').toDate();

        const session = this.sessionRepository.create({
          format: MOVIE_FORMAT.TWO_D, // default format
          language: 'English', // default language
          startTime,
          endTime,
          movie,
          theatre,
        });

        await this.sessionRepository.save(session);
        console.log(session.id, 'wwww');
        await this.seatService.seedTicketsForSession(session);

        previousEndTime = dayjs(endTime); // Update the end time for the next session
      }
    }
  }
}
