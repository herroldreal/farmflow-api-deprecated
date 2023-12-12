import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('GqlAuthGuard')
export class GqlAuthGuard extends FirebaseAuthGuard {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  @DebugLog('GetRequest')
  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ctx.getContext().req;
  }
}
