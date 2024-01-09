import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

@Injectable()
export class GqlAuthGuard extends FirebaseAuthGuard {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ctx.getContext().req;
  }
}
