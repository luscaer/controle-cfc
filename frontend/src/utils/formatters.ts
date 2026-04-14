
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