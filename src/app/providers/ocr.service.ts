import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {TextDectectService} from './text-dectect.service';
import {Platform} from '@ionic/angular';
import {OCR, OCRResult, OCRSourceType} from '@ionic-native/ocr/ngx';


@Injectable({
  providedIn: 'root'
})
export class OcrService {
  codeSubject = new Subject<string>();
  code: string="";

  constructor(private TextDectectService:TextDectectService,
              private platform: Platform,
              private ocr:OCR,
              ) { }




  EmitCode(code:string) {
    this.codeSubject.next(code);
  }


  DoOCR(imageData) {
    this.ocr.recText(OCRSourceType.BASE64,imageData)
        .then((res: OCRResult) => {
          this.code=this.TextDectectService.ExtractAndCleanlinesAndExtractCode(Array.from(res.lines.linetext))
          this.EmitCode(this.code);
        })
        .catch((error: any) => {console.error(error);
          console.log(JSON.stringify(error));
        });

  }

}
