import React from 'react';
import { ToTipoLocacaoEnumComPrefixo } from '../../extensions/EnumExtension';

function MontagemContrato({ data }) {
    console.log(data)
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const contractStyle = {
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        margin: '40px',
        textAlign: 'justify',
        width: '80vw',
        maxWidth: '60%'
    };

    const sectionStyle = {
        pageBreakBefore: 'always',
        pageBreakAfter: 'always',
        padding: '20px',
        border: '1px solid #ccc',
        marginBottom: '20px'
    };

    const signatureStyle = {
        textAlign: 'center',
        marginTop: '50px'
    };

    const signatureItemStyle = {
        textAlign: 'center',
        marginTop: '20px'
    };

    const testimonyStyle = {
        marginTop: '100px',
        textAlign: 'center'
    };

    const tituloStyle = {
        textAlign: 'center',
        fontSize: '150%',
        marginBottom: '40px'
    };

    const blueRectStyle = {
        backgroundColor: '#103260',
        width: '200px',
        height: '18px',
        display: 'inline-block'
    };

    return (
        <div style={containerStyle}>
            <div style={contractStyle}>
                <div style={sectionStyle} className="section">
                    <div style={tituloStyle}>
                        <h1>Contrato de Locação</h1>
                    </div>
                    <p>
                        <b>NOME:</b> {data?.locador?.nome ? data.locador?.nome : <div style={blueRectStyle}></div>} <br />
                        <b>PROFISSÃO:</b> {data?.locador?.profissao ? data.locador?.profissao : <div style={blueRectStyle}></div>} <br />
                        <b>CPF:</b> {data?.locador?.cpf ? data.locador.cpf : <div style={blueRectStyle}></div>} <br />
                        <b>NACIONALIDADE:</b> {data?.locador?.nacionalidade ? data.locador.nacionalidade : <div style={blueRectStyle}></div>} <br />
                        <b>ENDEREÇO:</b> {data?.locador?.endereco ? data.locador.endereco : <div style={blueRectStyle}></div>} <br />
                        <b>CIDADE:</b> {data?.locador?.cidade ? data.locador.cidade : <div style={blueRectStyle}></div>}
                    </p>

                    <br />

                    <p>
                        Neste instrumento denominado <b>LOCADOR</b>, tem justo e contratado com:
                        <br />
                        <br />
                        <b>NOME:</b> {data?.locatario?.nome ? data.locatario?.nome : <div style={blueRectStyle}></div>} <br />
                        <b>PROFISSÃO:</b> {data?.locatario?.profissao ? data.locatario?.profissao : <div style={blueRectStyle}></div>} <br />
                        <b>CPF:</b> {data?.locatario?.cpf ? data.locatario.cpf : <div style={blueRectStyle}></div>} <br />
                        <b>NACIONALIDADE:</b> {data?.locatario?.nacionalidade ? data.locatario.nacionalidade : <div style={blueRectStyle}></div>} <br />
                        <b>ENDEREÇO:</b> {data?.locatario?.endereco ? data.locatario.endereco : <div style={blueRectStyle}></div>} <br />
                        <b>CIDADE:</b> {data?.locatario?.cidade ? data.locatario.cidade : <div style={blueRectStyle}></div>}
                    </p>

                    <br />

                    <div>
                        <p>
                            Aqui denominado <b>LOCATÁRIO</b>, dar-lhe, em locação, <b>{data?.locacao?.tipoLocacao != 0 ? ToTipoLocacaoEnumComPrefixo(data.locacao?.tipoLocacao) : <div style={blueRectStyle}></div>},
                                situado à rua {data?.locacao?.rua ? data.locacao.rua : <div style={blueRectStyle}></div>}, {data?.locacao?.numero ? data.locacao.numero : <div style={blueRectStyle}></div>}, no
                                bairro {data?.locacao?.bairro ? data.locacao.bairro : <div style={blueRectStyle}></div>} em {data?.locacao?.cidade ? data.locacao.cidade : <div style={blueRectStyle}></div>}, {data?.locacao?.estado ? data.locacao.estado : <div style={blueRectStyle}></div>}.
                                nscrição Imobiliária nº {data?.locacao?.inscricaoImobiliaria ? data.locacao.inscricaoImobiliaria : <div style={blueRectStyle}></div>}.</b>
                        </p>

                        <br />

                        <p>
                            Mediante as cláusulas seguintes, as quais as partes contratantes se obrigam mutuamente:
                            <br />
                            <br />

                            <b>CLÁUSULA PRIMEIRA: </b>
                            O prazo de locação é de <b>24 (Vinte e quatro) meses</b>,
                            a iniciar em <b> 01/03/2023</b>, com término em <b>28/02/2025.</b>
                            <br />
                            <br />

                            <b>CLÁUSULA SEGUNDA: </b>
                            O <b>LOCATÁRIO</b> destinará o imóvel unicamente para fins <b>RESIDENCIAIS.</b>
                            <br />
                            <br />

                            <b>CLÁUSULA TERCEIRA: </b>
                            O aluguel mensal será de <b>R$ 930,00 (Novencentos e trinta reais)</b> para os
                            primeiros <b>12 (doze) meses</b>, sendo que após este período os valores serão corrigidos pelo IGPM/FGV, ou na falta
                            deste pela variação do maior índice legal permitido, conforme a menor periodicidade permitida e deverá ser satisfeito
                            até o dia <b>10 (Dez)</b> de cada mês, diretamente com o <b>LOCADOR.</b>
                            <br />
                            <br />

                            <i>PARÁGRAFO PRIMEIRO: </i>
                            Além do aluguel convencionado, correrá por conta do <b>LOCATÁRIO</b>, somente as
                            despesas com consumo de energia elétrica.
                            <br />
                            <br />

                            <i>PARÁGRAFO SEGUNDO: </i>
                            Fica estabelecido que o aluguel mensal e as parcelas previstas no parágrafo anterior
                            deverão ser pagas até o dia <b>10º (Vigésimo) dia de cada mês</b>, antecipadamente. Após esta data,
                            incorrerá na multa de <b>5% (Cinco por cento)</b> sobre o valor do aluguel mensal acrescido de correção monetária mais
                            juros de <b>1% (hum por cento)</b> ao mês até a data da sua efetiva quitação.
                            <br />
                            <br />

                            <i>PARÁGRAFO TERCEIRO: </i>
                            Havendo atraso no pagamento do aluguel, Energia Elétrica, superiores a 15 (quinze) dias
                            da data prevista para pagamento, o <b>LOCATÁRIO</b> ficará sujeito ao registro do débito junto ao SPC
                            (Serviço de Proteção ao Crédito).
                            <br />
                            <br />

                            <b>CLÁUSULA QUARTA: </b>
                            No caso de prorrogação da locação por determinação legal ou no caso de continuar o <b>LOCATÁRIO</b> na posse
                            do imóvel locado após o término do prazo estabelecido na <b>CLÁUSULA PRIMEIRA</b>, a partir do
                            dia seguinte ao vencido deste prazo, o aluguel mensal será sempre reajustado, nos mesmos períodos e na mesma
                            proporção estabelecida na <b>CLÁUSULA TERCEIRA</b> deste contrato.
                            <br />
                            <br />

                            <b>CLÁUSULA QUINTA: </b>
                            O <b>LOCATÁRIO</b> sempre que demonstrar a intenção de permanecer no imóvel locado, após o término
                            do prazo estabelecido na <b>CLÁUSULA PRIMEIRA</b> deverá manifestar-se por escrito ao <b>LOCADOR</b> e/ou em
                            um prazo máximo de <b>72 (setenta e duas) horas</b> antes do término do último dia do referido prazo, para que, em
                            caso de concordância do <b>LOCADOR</b>, providencie na entrega de um novo contrato de locação com o novo prazo
                            estabelecido.
                            <br />
                            <br />

                            <b>CLÁUSULA SEXTA: </b>
                            O <b>LOCATÁRIO</b> recebe juntamente com este contrato, o <b>RELATÓRIO DE VISTORIA</b> descrevendo o
                            estado do imóvel quando da sua entrada no imóvel e se compromete uma vez findo o prazo estabelecido pela
                            <b> CLÁUSULA PRIMEIRA</b>, restituir o objeto deste contrato, nas mesmas condições que o recebeu.
                            <br />
                            <br />

                            <i>PARÁGRAFO ÚNICO: </i>
                            No caso em que o <b>LOCATÁRIO</b> não restitua o imóvel nas condições descritas no referido
                            Relatório de Vistoria, poderá o <b>LOCADOR</b> recusar-se a receber as chaves do objeto deste contrato,
                            cumprindo o <b>LOCATÁRIO</b> à promover os reparos exigidos, ficando desde já estabelecido que o aluguel mensal e
                            encargos continuarão à vigorar até a devolução do imóvel nas condições previstas neste contrato.
                            <br />
                            <br />

                            <b>CLÁUSULA SÉTIMA: </b>
                            Sendo obrigatório o pagamento pelo <b>LOCATÁRIO</b> do seguro contra incêndio, não haverá qualquer
                            responsabilidade do <b>LOCADOR</b> em caso de ocorrências ou sinistros de incêndio no período contratual se
                            o <b>LOCATÁRIO</b> deixar ou recusar de pagar o valor do seguro a qualquer pretexto, haja vista que se trata
                            de obrigação acessória da locação.
                            <br />
                            <br />

                            <b>CLÁUSULA OITAVA: </b>
                            É vedado ao <b>LOCATÁRIO</b> depositar ou manusear no imóvel material inflamável, explosivos ou
                            corrosivos, que ofereçam riscos de incêndio e explosões.
                            <br />
                            <br />

                            <b>CLÁUSULA NONA: </b>
                            A falta de pagamento de qualquer uma das prestações no prazo legal acarretará a rescisão do
                            presente contrato, ficando o <b>LOCATÁRIO</b>, responsável pela multa prevista na <b>CLÁUSULA VIGÉSIMA
                                PRIMEIRA</b>, pelas despesas judiciais e honorárias advocatícios na base de <b>20% (vinte por cento)</b> sobre
                            o valor da ação, além disso, a importância será acrescida de juros de <b>1% (hum por cento) ao mês</b> mais correção monetária.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA: </b>
                            O <b>LOCATÁRIO</b> assume responsabilidade civil e criminal pela legitimidade da assinatura,
                            lançada neste instrumento.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA PRIMEIRA: </b>
                            O <b>LOCATÁRIO</b> concorda, para o fim especial desta locação, caso se faça necessário,
                            receber citações iniciais em todas e quaisquer ações judiciais referente a presente relação de locação.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA SEGUNDA: </b>
                            Para efeito de dar cumprimento ao disposto nesta cláusula, o <b>LOCATÁRIO </b>
                            responsabiliza-se em tomar pessoalmente as medidas que se fizerem necessárias para eventuais consertos ou
                            reparos no imóvel locado, ficando desobrigado o <b>LOCADOR</b> de tomar providências neste sentido.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA TERCEIRA: </b>
                            O <b>LOCATÁRIO</b> desde já faculta ao <b>LOCADOR</b> ou seu representante legal examinarem ou
                            vistoriarem o imóvel locado, quando entenderem conveniente.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA QUARTA: </b>
                            Não poderá o <b>LOCATÁRIO</b> fazer modificações ou transformações no imóvel locado, nem introduzir quaisquer
                            benfeitorias no mesmo, sem que haja prévio consentimento por escrito do <b>LOCADOR</b>; ditas
                            benfeitorias uma vez introduzidas, ficarão incorporadas ao imóvel locado, não dando ao <b>LOCATÁRIO </b>o direito
                            de retenção ao término da locação e nem lhe possibilitando a exigência de qualquer indenização por conta das mesmas.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA QUINTA: </b>
                            O <b>LOCATÁRIO</b> não poderá sublocar, ceder, transferir ou emprestar o imóvel locado, no
                            todo ou em parte, sem prévio consentimento por escrito do <b>LOCADOR</b>, devendo no caso agir oportunamente junto
                            aos ocupantes, a fim de que o imóvel esteja completamente desimpedido no término do prazo contratual.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA SEXTA: </b>
                            Ocorrerá a rescisão deste contrato, de pleno direito, no caso de desapropriação,
                            incêndio ou acidente que sujeitem o imóvel locado a obras que importem na sua reconstrução total ou que
                            impeçam o uso do mesmo por mais de <b>30 (trinta) dias</b> ficando o <b>LOCATÁRIO</b> em mora e sujeita a
                            multa contratual e ação de despejo, decorrido os dias de tolerância sem que o mesmo desocupe o imóvel.
                            <br />
                            <br />

                            <i>PARÁGRAFO PRIMEIRO: </i>
                            No caso de desapropriação do imóvel objeto da locação, ficará o <b>LOCADOR </b>
                            desobrigado por todas as cláusulas deste contrato, ressalvado o <b>LOCATÁRIO</b> tão somente o direito de pleitear do poder
                            desapropriante a indenização que por ventura lhe for devida.
                            <br />
                            <br />

                            <i>PARÁGRAFO SEGUNDO: </i>
                            Ocorrerá a rescisão, de pleno direito, do presente contrato, se o <b>LOCATÁRIO </b>
                            infringir obrigações legais ou cometer grave infração contratual.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA SÉTIMA: </b>
                            Obriga-se o <b>LOCATÁRIO</b> a satisfazer todas as exigências dos poderes públicos a que der causa,
                            bem como obedecer ao Regulamento Interno entregue juntamente com este instrumento de locação residencial.
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA OITAVA: </b>
                            Assume o <b>LOCATÁRIO</b> o formal compromisso de <b>30 (trinta) dias</b> antes de desocupar o imóvel locado
                            solicitar por escrito ao <b>LOCADOR</b> ou seu procurador que efetue uma vistoria no mesmo, a fim de
                            ficar constatado o seu estado de conservação, comprometendo-se ainda a exibir, por ocasião da entrega das
                            chaves, o comprovante de quitação das despesas de energia elétrica, com a respectiva solicitação de
                            desligamento de fornecimento de Energia Elétrica, emitida pela Central Elétrica de Santa Catarina (CELESC).
                            No caso de assim não proceder, ficará responsável pelo pagamento da multa estipulada na <b>CLÁUSULA VIGÉSIMA
                                PRIMEIRA.</b>
                            <br />
                            <br />

                            <b>CLÁUSULA DÉCIMA NONA: </b>
                            O <b>LOCATÁRIO</b> obriga-se a entregar ao <b>LOCADOR</b>, os avisos de lançamento do imposto
                            predial (IPTU), Tarifa de Coleta de Lixo e taxa de água, tão logo receba dos órgãos lançadores.
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA: </b>
                            Fica estipulada a multa no valor de <b>01 (um)</b> aluguel vigente na época, a ser pago pela
                            parte que infringir qualquer cláusula, deste contrato, inclusive no caso de despejo por falta de pagamento
                            do aluguel e encargos ou desocupação do imóvel antes de findo os primeiros <b>12 (Doze)</b> meses de locação.
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA PRIMEIRA: </b>
                            O <b>LOCATÁRIO</b> compromete-se quando da desocupação do referido imóvel, efetuar
                            pintura no mesmo, com cor e material da mesma qualidade.
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA SEGUNDA: </b>
                            O(a) Locatário(a) expressamente autoriza a Locadora a proceder a cobrança via
                            protesto, proceder à sua citação inicial, interpelações, intimações, notificações, ou qualquer outro meio de
                            comunicação inequívoco em toda e qualquer ação judicial ou procedimento extrajudicial, decorrente da relação
                            locatícia ora ajustada, especialmente as intimações referidas nos <b>artigo 62, inciso II e III e artigo 67
                                inciso II e VII da Lei 8245/91</b>, podendo ser realizada via postal para endereço do imóvel, por e-mail,
                            WhatsApp, cartório de títulos e documentos, entre outros.
                            <br />
                            <br />

                            <i>PARÁGRAFO PRIMEIRO: </i>
                            Fica ajustado que as comunicações/notificações que tratam a presente cláusula
                            deverão ser encaminhadas para os e-mails abaixo informados: {data?.locador?.email ? data.locador?.email : <div style={blueRectStyle}></div>}
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA TERCEIRA: </b>
                            Fica acordado entre as partes que, caso haja mudanças na <b>Lei nº 8.245/1991(Lei, Dec. Lei, Medida Provisória, etc.)</b>,
                            automaticamente o presente contrato passará a ser regido pelo índice oficial e pela periodicidade mínima permitida.
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA QUARTA: </b>
                            O condomínio ou o <b>LOCADOR</b> não se responsabiliza por furtos ou roubos nos
                            apartamentos, furtos de peças e/ou acessórios dos veículos, bem como do roubo, furto ou assalto à mão armada
                            dos veículos, bicicletas quando nas áreas comuns e privadas.
                            <br />
                            <br />

                            <b>CLÁUSULA VIGÉSIMA QUINTA: </b>
                            Fica desde já eleito o foro desta cidade, que é o da localização do imóvel, para solução de todas as questões
                            ou incidentes com fundamento neste contrato, renunciando as partes a qualquer foro de domicílio atual ou futuro.
                            <br />

                        </p>
                        <div style={signatureStyle} className="signature">
                            <p>Joinville (SC), 24 de Fevereiro de 2023.</p>
                            <br />
                            <div style={signatureItemStyle} className="signee">
                                <p>__________________________________________</p>
                                <p>
                                    <b>{data?.locador?.nome ? data.locador?.nome : <div style={blueRectStyle}></div>}</b>
                                    <br />
                                    <b>Locador</b>
                                </p>
                            </div>
                            <div style={signatureItemStyle} className="signee">
                                <p>__________________________________________</p>
                                <p>
                                    <b>{data?.locatario?.nome ? data.locatario?.nome : <div style={blueRectStyle}></div>}</b>
                                    <br />
                                    <b>Locatária</b>
                                </p>
                            </div>
                            <div style={testimonyStyle} className="testimony">
                                <p>
                                    <b>Testemunhas:</b>
                                    <br />
                                    ______________________________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________________________________
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MontagemContrato;
