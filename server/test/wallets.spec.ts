import * as chai from 'chai';
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Wallet from '../models/wallet';

chai.use(require('chai-http')).should();

describe('Wallets', () => {

  beforeEach(done => {
    Wallet.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for wallets', () => {

    it('should get all the wallets', done => {
      chai.request(app)
        .get('/api/wallets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get wallets count', done => {
      chai.request(app)
        .get('/api/wallets/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new wallet', done => {
      const wallet = new Wallet({ id_user: 'XXXXX', coins: 100 });
      chai.request(app)
        .post('/api/wallet')
        .send(wallet)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('id_user');
          res.body.should.have.a.property('coins');
          done();
        });
    });

    it('should get a wallet by its id', done => {
      const wallet = new Wallet({ id_user: 'XXXXX', coins: 100 });
      wallet.save((error, newWallet) => {
        chai.request(app)
          .get(`/api/wallet/${newWallet.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id_user');
            res.body.should.have.property('coins');
            res.body.should.have.property('_id').eql(newWallet.id);
            done();
          });
      });
    });

    it('should update a wallet by its id', done => {
      const wallet = new Wallet({ id_user: 'XXXXX', coins: 100 });
      wallet.save((error, newWallet) => {
        chai.request(app)
          .put(`/api/wallet/${newWallet.id}`)
          .send({ coins: 105 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a wallet by its id', done => {
      const wallet = new Wallet({ id_user: 'XXXXXX', coins: 100 });
      wallet.save((error, newWallet) => {
        chai.request(app)
          .del(`/api/wallet/${newWallet.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


