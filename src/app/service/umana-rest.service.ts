import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TokenRequest } from '../dto/token-request';
import { TokenResponse } from '../dto/token-response';
import { map } from 'rxjs/operators';
import { Course } from '../resource/course';
import { CoursesResponse } from '../dto/courses-response';

const url = "/api"; // in produzione sarà "http://rest.example.com"

@Injectable({
  providedIn: 'root'
})
export class UmanaRestService {

  // i ruoli dell'eventuale utente autenticato
  roles = new Array<string>();
  // il token di autorizzazione per le chiamate REST
  private token?: string;

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<string> {
    let request = new TokenRequest();
    request.username = username;
    request.password = password;

    let response = this.http.post<TokenResponse>(url + "/token", request);
    // l'operazione che mi trasforma un Observable<TipoA> in un Observable<TipoB>
    // si chiama mappatura; il modo più semplice è definire un metodo di
    // mappatura; la function map di rxjs serve proprio per trasformare
    // la function TipoA => TipoB in una function Observable<TipoA> => Observable<TipoB>
    return response.pipe(map((answer) => this.loginMap(answer)));
  }
  // il tipo del parametro è TipoA, nel nostro caso TokenResponse
  // il tipo restituito è TipoB, nel nostro caso string
  // nota bene: questo metodo è invocato solo se la post restituisce il valore
  // atteso (range 200-399)
  private loginMap(answer: TokenResponse): string {
    // di solito non si fa, ma nel nostro caso abbiamo bisogno di un "side effect"
    // ossia impostare i valori di roles e token
    this.roles = answer.authorization.roles;
    this.token = answer.authentication.token_type + ' ' + answer.authentication.access_token;
    // questo è quello che invece va fatto
    return "accesso effettuato correttamente";
  }

  getCourses(): Observable<Course[]> {
    if (this.token === undefined) {
      // abbiamo due possibilità: restituire undefined oppure un Observable vuoto
      // per restituire un Observable vuoto uso:
      return from([]);
    }
    let headers = new HttpHeaders({ authorization: this.token });
    let response = this.http.get<CoursesResponse>(url + "/courses", { headers });
    return response.pipe(map((answer) => this.getCoursesMap(answer)));
  }
  private getCoursesMap(answer: CoursesResponse): Course[] {
    return answer._embedded.courses;
  }

  logout(): Observable<string> {
    // un server REST è stateless, non memorizza le mie credenziali
    // sono io che le devo dimenticare
    this.roles = [];
    this.token = undefined;
    return from(["logout effettuato correttamente"]);
  }

  isLogged(): boolean {
    return this.token !== undefined;
  }

  getCourseById(id: number): Observable<Course> {
    if (this.token === undefined) {
      return from([]);
    }
    let headers = new HttpHeaders({ authorization: this.token });
    let response = this.http.get<Course>(url + "/courses/" + id, {headers});
    return response;
  }
}
