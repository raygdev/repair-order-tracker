import {
 type Part,
 PartsRepositoryPort,
 BaseUseCase
} from '../../domain'
import { partsService } from '../../adapters/parts.service'

export class PartUpdateUseCase extends BaseUseCase<
  Part,
  Promise<Part>
> {
  constructor(private repo: PartsRepositoryPort) {
    super()
  }
  execute(part: Part) {
    return this.repo.updatePart(part)
  }
}

export const partUpdate = new PartUpdateUseCase(partsService)