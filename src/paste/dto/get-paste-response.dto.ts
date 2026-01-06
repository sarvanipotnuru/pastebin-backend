import { Expose } from "class-transformer";

export class GetPasteResponseDto {

 @Expose()
  content: string;
}
