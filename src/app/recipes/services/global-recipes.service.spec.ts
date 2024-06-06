import { GlobalRecipesService } from './global-recipes.service';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalRecipes } from '../models/recipe.model';
import { ResponseGlobalRecipes } from '../models/response-recipe.model';

describe('GlobalRecipesService', () => {
  let service: GlobalRecipesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch'])
    service = new GlobalRecipesService(httpClientSpy)

  });

  it('should send vote with proper action and return new', (done: DoneFn) => {
    const expectedVotes = { votes: { likes: ['asdaeweqd'], dislikes: [''] } };

    httpClientSpy.patch.and.returnValue(of(expectedVotes));

    service.voteRecipe('asdase', 'like', 'asdaeweqd').subscribe({
      next: votes => {
        expect(votes).toEqual(expectedVotes);
        done();
      }, error: done.fail
    });

    expect(httpClientSpy.patch.calls.count()).toBe(1);

  });

  it('should get GlobalList based on pagination', (done: DoneFn) => {

    const globalList: ResponseGlobalRecipes[] = [
      {
        "createdBy": {
          "author": "Tester",
          "authorId": "663e75008083dcd30f0c6507"
        },
        "nutritions": {
          "calories": 357,
          "fat": 25,
          "carbohydrate": 46,
          "protein": 8
        },
        "votes": {
          "likes": [
            "6658c920c0c59ac97cdeb994",
            "663b9dc02c6ae56fb5fd5b26"
          ],
          "dislikes": []
        },
        "_id": "664251baedb28308c52ba525",
        "name": "Sernik Królewski",
        "dish": "cake",
        "difficult": "moderate",
        "prepTime": 25,
        "cookTime": 65,
        "serves": 12,
        "photosAlbumId": "664251b9edb28308c52ba521",
        "published": true,
        "createdAt": "2024-05-13T17:45:30.117Z",
        "updatedAt": "2024-06-03T12:08:43.922Z",
        "ingredients": [
          "400g mąki pszennej",
          "40g kakao",
          "200g masła lub margaryny",
          "250g cukru",
          "1 jajko",
          "1 łyżeczka proszku do pieczenia",
          "2 łyżki jogurtu naturalnego",
          "1kg twarogu z wiaderka lub twarogu półtłustego",
          "1 opakowanie budyniu waniliowego bez cukru ",
          "skórka starta z połowy pomarańczy",
          "szczypta soli"
        ],
        "instructions": "<ol><li>Przygotować ciasto kruche: Mąkę wsypać do miski. Dodać kakao, pokrojone na małe kawałki zimne masło, jajko, cukier, proszek do pieczenia i jogurt. Zagnieść na jednolitą masę (ręką lub robotem kuchennym, używając haka do zagniatania ciasta). Ciasto podzielić na trzy równe części. Każdą owinąć w folię spożywczą i wstawić do lodówki na co najmniej 3 godziny.</li><li>Dno tortownicy o średnicy 26 cm wyłożyć papierem do pieczenia, a następnie zacisnąć obręcz. Jedną część ciasta zagnieść ponownie, aby ciasto zmiękło i zrobiło się plastyczne. Ciastem wykleić bok formy mniej więcej do ¾ wysokości. Drugą część ciasta zetrzeć na tarce o dużych oczkach na dno tortownicy. (Startego ciasta jest dość dużo). Tortownicę wstawić do lodówki.</li><li>Przygotować masę serową: Żółtka oddzielić od białek. Białka ubić ze szczyptą soli na sztywną pianę. Twaróg, cukier, żółtka, budyń w proszku i startą skórkę z pomarańczy przełożyć do miski i zmiksować przez chwilę na gładką masę, tylko do momentu połączenia się składników. (Nie miksować za długo). Na końcu wmieszać delikatnie pianę z białek.</li><li>Masę serową przełożyć do tortownicy. Na wierzch zetrzeć na tarce o dużych oczkach trzecią część ciasta.</li><li>Piec w nagrzanym piekarniku ok. 60 minut w temperaturze 180°C, grzałka góra- dół. Wyłączyć piekarnik i studzić sernik przy uchylonych drzwiczkach piekarnika. Zimny sernik wstawić na parę godzin lub całą noc do lodówki.</li></ol><p></p>"
      }

    ];

    const expectedGlobalList = [
      {
        "createdBy": {
          "author": "Tester",
          "authorId": "663e75008083dcd30f0c6507"
        },
        "nutritions": {
          "calories": 357,
          "fat": 25,
          "carbohydrate": 46,
          "protein": 8
        },
        "votes": {
          "likes": [
            "6658c920c0c59ac97cdeb994",
            "663b9dc02c6ae56fb5fd5b26"
          ],
          "dislikes": []
        },
        "id": "664251baedb28308c52ba525",
        "name": "Sernik Królewski",
        "dish": "cake",
        "difficult": "moderate",
        "prepTime": 25,
        "cookTime": 65,
        "serves": 12,
        "photos": [],
        "photosAlbumId": "664251b9edb28308c52ba521",
        "published": true,
        "ingredients": [
          "400g mąki pszennej",
          "40g kakao",
          "200g masła lub margaryny",
          "250g cukru",
          "1 jajko",
          "1 łyżeczka proszku do pieczenia",
          "2 łyżki jogurtu naturalnego",
          "1kg twarogu z wiaderka lub twarogu półtłustego",
          "1 opakowanie budyniu waniliowego bez cukru ",
          "skórka starta z połowy pomarańczy",
          "szczypta soli"
        ],
        "instructions": "<ol><li>Przygotować ciasto kruche: Mąkę wsypać do miski. Dodać kakao, pokrojone na małe kawałki zimne masło, jajko, cukier, proszek do pieczenia i jogurt. Zagnieść na jednolitą masę (ręką lub robotem kuchennym, używając haka do zagniatania ciasta). Ciasto podzielić na trzy równe części. Każdą owinąć w folię spożywczą i wstawić do lodówki na co najmniej 3 godziny.</li><li>Dno tortownicy o średnicy 26 cm wyłożyć papierem do pieczenia, a następnie zacisnąć obręcz. Jedną część ciasta zagnieść ponownie, aby ciasto zmiękło i zrobiło się plastyczne. Ciastem wykleić bok formy mniej więcej do ¾ wysokości. Drugą część ciasta zetrzeć na tarce o dużych oczkach na dno tortownicy. (Startego ciasta jest dość dużo). Tortownicę wstawić do lodówki.</li><li>Przygotować masę serową: Żółtka oddzielić od białek. Białka ubić ze szczyptą soli na sztywną pianę. Twaróg, cukier, żółtka, budyń w proszku i startą skórkę z pomarańczy przełożyć do miski i zmiksować przez chwilę na gładką masę, tylko do momentu połączenia się składników. (Nie miksować za długo). Na końcu wmieszać delikatnie pianę z białek.</li><li>Masę serową przełożyć do tortownicy. Na wierzch zetrzeć na tarce o dużych oczkach trzecią część ciasta.</li><li>Piec w nagrzanym piekarniku ok. 60 minut w temperaturze 180°C, grzałka góra- dół. Wyłączyć piekarnik i studzić sernik przy uchylonych drzwiczkach piekarnika. Zimny sernik wstawić na parę godzin lub całą noc do lodówki.</li></ol><p></p>"
      }

    ];

    httpClientSpy.get.and.returnValue(of({ recipes: globalList, count: 1 }));

    service.getGlobalList().subscribe({
      next: list => {
        expect(list).toEqual(expectedGlobalList);
        expect(service.pagination().length).toBe(1);
        done();
      }, error: done.fail
    })
  });

});
