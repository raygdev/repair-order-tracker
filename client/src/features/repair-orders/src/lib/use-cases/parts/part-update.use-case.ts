import {
 type Part,
 PartsRepositoryPort,
 BaseUseCase
} from '../../domain'

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