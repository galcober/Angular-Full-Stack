import { Component, OnInit } from '@angular/core';
import { Symbols } from './symbols';

import { JwtHelperService } from '@auth0/angular-jwt';

import { WalletService } from '../services/wallet.service';

import { Wallet } from '../shared/models/wallet.model';

@Component({
  selector: 'app-spintest',
  templateUrl: './spintest.component.html',
  styleUrls: ['./spintest.component.scss']
})
export class SpintestComponent implements OnInit {

  id;

  walletUser: Wallet = new Wallet();

  // coins = 0; // varaible to count the coins
  betCoins = 0; // total betting coins
  netCoins: any;

  details: any;
  // detailObj: leaderboard;
  win;
  lost;

  stopSpin; // variable to clear the setinterval(stop) method

  currentSym1: Symbols; // Symbol1 in the reel
  currentSym2: Symbols; // Symbol2 in the reel
  currentSym3: Symbols; // Symbol3 in the reel
  currentSym4: Symbols; // Symbol4 in the reel
  currentSym5: Symbols; // Symbol4 in the reel

  // creating symbol objects
  symbol1: Symbols = {
    value: 7,
    symbolLink: '/assets/images/call_of_duty.jpeg'
    // symbolLink: '/assets/images/redseven.png'
  };
  symbol2: Symbols = {
    value: 2,
    symbolLink: '/assets/images/god_of_war.jpeg'
    // symbolLink: '/assets/images/cherry.png'
  };
  symbol3: Symbols = {
    value: 3,
    symbolLink: '/assets/images/mass_effect_andromeda.jpg'
    // symbolLink: '/assets/images/lemon.png'
  };
  symbol4: Symbols = {
    value: 4,
    symbolLink: '/assets/images/mortal_kombat.jpg'
    // symbolLink: '/assets/images/plum.png'
  };
  symbol5: Symbols = {
    value: 5,
    symbolLink: '/assets/images/red_dead.jpeg'
    // symbolLink: '/assets/images/watermelon.png'
  };
  symbol6: Symbols = {
    value: 6,
    symbolLink: '/assets/images/uncharted.jpeg'
    // symbolLink: '/assets/images/bell.png'
  };

  symbolReel: Symbols[] = [this.symbol1, this.symbol2, this.symbol3, this.symbol4, this.symbol5, this.symbol6];

  constructor(private jwtHelper: JwtHelperService,
              private walletService: WalletService) {}

  ngOnInit() {
    // console.log("machine");
    // initializing the current symbols
    this.currentSym1 = this.symbolReel[2];
    this.currentSym2 = this.symbolReel[4];
    this.currentSym3 = this.symbolReel[5];
    this.currentSym4 = this.symbolReel[3];
    this.currentSym5 = this.symbolReel[1];
    console.log('Machine ran');
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setWalletUser(decodedUser);
    }
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setWalletUser(decodedUser) {
    this.walletService.getWalletByUserId(decodedUser._id).subscribe(
      data => this.walletUser = data,
      error => console.log(error)
    );
  }

  stopSpinning() {
    clearInterval(this.stopSpin);
    this.winOrLose();

    // this.id = this.route.snapshot.params['id'];
    /*this.itemService.getListings().subscribe(items => {
      this.details = items;
      //console.log(this.details);

      this.id = this.details[0].id;
      this.win = this.details[0].matchWins;
      this.lost = this.details[0].matchLost;
      console.log("machine");

      });*/
  }

  spinning() {
    if (this.betCoins > 0) {
    // spinning
    this.stopSpin = setInterval(() => { this.spin(); }, 30);
    } else {
      alert('Insufficent Coins!');
    }
  }

  spin() {
    // Generating random numbers to get random element from the reel array
    const randomNum1 = Math.floor(Math.random() * (this.symbolReel.length - 1));
    const randomNum2 = Math.floor(Math.random() * (this.symbolReel.length - 1));
    const randomNum3 = Math.floor(Math.random() * (this.symbolReel.length - 1));
    const randomNum4 = Math.floor(Math.random() * (this.symbolReel.length - 1));
    const randomNum5 = Math.floor(Math.random() * (this.symbolReel.length - 1));

    // assigning the element to a variable
    this.currentSym1 = this.symbolReel[randomNum1];
    this.currentSym2 = this.symbolReel[randomNum2];
    this.currentSym3 = this.symbolReel[randomNum3];
    this.currentSym4 = this.symbolReel[randomNum4];
    this.currentSym5 = this.symbolReel[randomNum5];

  }

  addCoin() {
    // adding a coin to credit
    this.walletUser.coins++;
    console.log('Coins' + this.walletUser.coins);
  }

  betCoin() {
    if (this.walletUser.coins > 0) {
      // adding credit to bettingcredit
      this.betCoins++;
      this.netCoins++;
      this.walletUser.coins--;
    }
    console.log('Bet Coins' + this.betCoins);
    console.log('Coins' + this.walletUser.coins);
  }

  betMax() {
    if (this.walletUser.coins > 2) {
      // betting maximum of 3 coins
      this.betCoins += 3;
      this.netCoins += 3;
      this.walletUser.coins -= 3;
    }
  }

  reset() {
    this.walletUser.coins += this.betCoins;
    this.betCoins = 0;
    console.log('Bet Coins' + this.betCoins);
  }


  winOrLose() {
    // boolean values to compare reel slots
    const slot1_eq_slot2: boolean = (this.currentSym1 === this.currentSym2);
    const slot2_eq_slot3: boolean = (this.currentSym2 === this.currentSym3);
    const slot1_eq_slot3: boolean = (this.currentSym1 === this.currentSym3);
    const slot1_eq_slot4: boolean = (this.currentSym1 === this.currentSym4);
    const slot2_eq_slot4: boolean = (this.currentSym2 === this.currentSym4);
    const slot3_eq_slot4: boolean = (this.currentSym3 === this.currentSym4);

    if (slot1_eq_slot2 || slot2_eq_slot3 || slot1_eq_slot3 || slot1_eq_slot4 || slot2_eq_slot4 || slot3_eq_slot4) {
      // if 2 or 3 symbols are matching game is won
      if (slot1_eq_slot2) {
        this.walletUser.coins += (this.currentSym1.value * this.betCoins);
      } else if (slot1_eq_slot3) {
        this.walletUser.coins += (this.currentSym3.value * this.betCoins);
      } else if (slot2_eq_slot3) {
        this.walletUser.coins += (this.currentSym2.value * this.betCoins);
      } else if (slot3_eq_slot4) {
        this.walletUser.coins += (this.currentSym3.value * this.betCoins);
      }
      // match win counts
      this.win++;
      // setting the bet coins to 0 after a game
      this.betCoins = 0;
      alert('You WON!');
    } else {
      // match lost count
      this.lost++;
      // setting the bet coins to 0 after a game
      this.betCoins = 0;
      alert('You have Lost!');
    }
    const winAndLost = {
      id: this.id,
      matchLost: this.lost,
      matchWins: this.win
    };

    // this.updateDetails(winAndLost);
  }

  /*updateDetails(winsAndLost: leaderboard){
    this.itemService.updateItem(winsAndLost);
    //this.router.navigate(['/stats']);

  }*/

  /*getListObjects(){
    for(let i = 0;i < this.details.length; i++){
      this.detailObj = this.details[i];
    }
    return this.detailObj;
  }*/


}
