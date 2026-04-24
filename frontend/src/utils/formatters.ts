export function aplicarMascaraCnpj(cnpj: string) {
  let cnpjLimpo = cnpj.replace(/\D/g, "");

  if (cnpjLimpo.length > 14) {
    cnpjLimpo = cnpjLimpo.slice(0, 14);
  }

  cnpjLimpo = cnpjLimpo.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpjLimpo = cnpjLimpo.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpjLimpo = cnpjLimpo.replace(/\.(\d{3})(\d)/, ".$1/$2");
  cnpjLimpo = cnpjLimpo.replace(/(\d{4})(\d)/, "$1-$2");

  return cnpjLimpo;
}

export function extrairIniciaisNome(nome: string) {
  const nomeLimpo = nome.trim().split(" ").filter(Boolean);

  if (nomeLimpo.length === 0) return "";

  const primeiraInicial = nomeLimpo[0][0];

  const segundaInicial = nomeLimpo.length > 1 ? nomeLimpo.at(-1)?.[0] : "";

  return (primeiraInicial + segundaInicial).toUpperCase();
}

export function tratarBuscaAutoEscola(valor: string) {
  if (!valor) return "";

  const temLetras = /[a-zA-Z]/.test(valor);

  if (temLetras) return valor;

  return aplicarMascaraCnpj(valor);
}
