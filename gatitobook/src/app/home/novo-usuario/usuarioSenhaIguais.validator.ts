import { FormGroup } from '@angular/forms';
/** Esta função vai verificar se o campo de nome de usuario e senha são iguais. Se for, vai retornar um 
 * objeto com valor true. Se não for, vai retornar null; de acordo com as regras para validação customizada
 * no angular (se a validação de erro customizado der ok para o erro, retorne um objeto com o valor true;
 * se não der ok para o erro, retorne null).
 */
export function usuarioSenhaIguais(formGoup: FormGroup) {
  /** Esta funcionalidade "?.value ?? ''; " certifica de que, se o que esta dentro de "?.value" for 
   * undefined, ele (??) vai substituir por string vazia (''), para não travar a aplicação.
  */
  const userName: string = formGoup.get('userName')?.value ?? '';
  const password: string = formGoup.get('password')?.value ?? '';
  /** Este "if()" foi criado porque a validação de erro customizado precisa de algum retorno em suas buscas,
   * mesmo que seja nul. A busca é feita a cada digitação do usuário no input. Sendo assim, a cada busca, 
   * por digitação, se não passar, tem que retornar no else um null. Estava usando a penas o ternário e 
   * a validação não estava rodando.
   */
  if ( userName.trim() + password.trim() ) {
    return userName !== password ? null : { usuarioIgualSenha: true };
  } else {
    return null;
  }
}
