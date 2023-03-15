export const environment = {
  production: false,
  apiURL: 'http://localhost:3000',
};
/** Este arquivo tem o propósito de usar um endpoint em um único lugar. E no momento de builder, o
 * compilador troca automaticamente este arquivo de endpint de testes de conexão com API pelo arquivo
 * que contém um endpoint de funcionamento real, o qual tem um atributo "production:" com o valor "true".
 */
