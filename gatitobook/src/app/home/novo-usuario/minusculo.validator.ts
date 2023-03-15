import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;
  if(valor !== valor.toLowerCase()) return { minusculo: true };
  else return null;
}

/** Esta função que está sendo exportada está sendo usada como um erro customizado, onde ela retorna um
 * objeto com a propriedade que aqui está sendo "minusculo", mas poderia ser qualquer outro nome, caso
 * na condição "if"; e retorna null, caso não passe. Este objeto retornado com a propriedade de valor true
 * será usado no template, na hora de usar o "?.errors?.['minusculo']" para usar o boolean. Sendo esse
 * boolean true, executará a condição que exibe a mensagem. Se o valor retornado seja null, não executará
 * nada. O AbstractControl está sendo usado para tipar o parâmetro recebido. Este AbstractControl pertence
 * ao forms. Esse parâmetro é passado de forma implicita pelo código; sem precisar declarar esse parâmetro.
 * A função "minusculoValidator()" deve ser passada para o segundo array, da propriedade contida no 
 * objeto criado pelo FormsBuilder.get({}), que quero customizar. Mas devo passar sem os parênteses. Deve
 * focar desta forma: minusculoValidator. E para colocar em ação do template, no momento de buscar o 
 * erro pelo "Reactiveforms.get('propriedadeDoFormBuilder')?.errors?.['propriedadeDoObjetoRetornado'].
 * Sendo assim, sua aplicação de forma resumida fica: formGroup.get('propForm')?.errors?.['propFunction'].
 */