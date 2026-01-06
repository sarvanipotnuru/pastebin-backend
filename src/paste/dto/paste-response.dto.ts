import { Expose } from "class-transformer";

export class CreatePasteResponseDto {

  @Expose()
  id: string;

  @Expose()
  url: string;
}
