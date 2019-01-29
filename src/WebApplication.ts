import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Parameters from './infrastracture/datasource/config/Parameters';
import ApiV1RouterWrapper from './presentation/apiv1/ApiV1RouterWrapper';
import { AddressInfo } from 'net';
import DiDifiner from './DiDifiner';

export default class WebApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();

    const diDifiner = new DiDifiner(settings);
    const container = diDifiner.build();

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const apiV1RouterWrapper = container.get<ApiV1RouterWrapper>('ApiV1RouterWrapper');
    app.use(apiV1RouterWrapper.uri, apiV1RouterWrapper.build());

    const server = app.listen(settings.port, () => {
      const port = (<AddressInfo>server.address()).port;
      console.log('Node.js & Express is listening to Port:' + port);
    });
  }
}
