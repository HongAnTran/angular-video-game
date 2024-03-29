import { HttpService } from './../../services/http.service';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { APIResponse, Game } from '../../models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnDestroy {
  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub?:Subscription
  private gameSub?:Subscription
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
 
  ) {}

  ngOnInit(): void {
  this.routeSub =  this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }
  searchGames(sort: string, search?: string): void {
  this.gameSub =  this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  ngOnDestroy(): void {
      if(this.gameSub) {
          this.gameSub.unsubscribe();
      }

      if(this.routeSub){
          this.routeSub.unsubscribe();
      }
  }
}
