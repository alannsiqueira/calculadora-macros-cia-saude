# 🧮 Calculadora de Macros e TMB

Uma calculadora completa de macronutrientes, calorias e composição corporal desenvolvida para auxiliar no planejamento nutricional de forma profissional e precisa.

## 📋 Funcionalidades Implementadas

### ✅ Cálculos Base
- **TMB (Taxa Metabólica Basal)** usando duas fórmulas:
  - **Mifflin-St Jeor**: Padrão para quando não há dados de composição corporal
  - **Katch-McArdle**: Mais precisa quando o percentual de gordura é conhecido
- **TDEE (Gasto Energético Total Diário)** com multiplicadores de atividade física
- Ajustes personalizados para treino de musculação (30 kcal/dia por sessão)
- Ajustes personalizados para cardio (70 kcal/dia por sessão)

### 🎯 Objetivos Nutricionais
- **Cutting (Perda de Gordura)**: Déficit calórico personalizável (150/250/500/custom kcal)
- **Bulking (Ganho de Massa)**: Superávit calórico personalizável (150/250/500/custom kcal)
- **Manutenção**: Manter peso corporal estável

### 🥗 Distribuição de Macronutrientes
Dois métodos disponíveis:

**1. Gramas por kg de peso corporal**
- Proteína: 1.6g/kg, 1.8g/kg, 2.0g/kg, 2.2g/kg ou customizado
- Gordura: 0.8g/kg, 1.0g/kg, 1.2g/kg ou customizado
- Carboidratos: Calculado automaticamente com calorias restantes

**2. Porcentagem de calorias**
- Distribuição livre entre proteínas, carboidratos e gorduras
- Validação de soma = 100%

### 📊 Análise de Composição Corporal
- Massa magra (kg)
- Massa gorda (kg)
- Percentual de gordura corporal
- Visualização apenas quando percentual de gordura é informado

### ⚠️ Validações Nutricionais Inteligentes
- Alerta se proteína < 1.8g/kg em cutting (preservação muscular)
- Alerta se gordura < 0.5g/kg (saúde hormonal)
- Alerta se déficit > 25% do TDEE (muito agressivo)
- Alerta se superávit > 15% do TDEE (ganho excessivo de gordura)

### 💡 Recomendações Profissionais
- **Hidratação**: 35ml por kg de peso corporal
- **Fibras**: 14g por 1000 kcal consumidas
- **Taxa saudável de perda/ganho**:
  - Cutting: 0.5-1kg/semana (máx 1% do peso)
  - Bulking: 0.25-0.5kg/semana
  - Manutenção: ±0.5kg de variação

### 🍽️ Distribuição por Refeições
- Divisão automática dos macros entre 3-6 refeições diárias
- Cards visuais com calorias e macros por refeição

### 🔗 Persistência e Compartilhamento
- **URL Parametrizada**: Compartilhe cálculos via link
- **LocalStorage**: Auto-save dos dados do formulário
- **Copiar Link**: Botão para copiar URL atual
- **Exportar TXT**: Download de arquivo com todos os dados e link

### 🎨 Interface
- Design moderno com gradiente roxo/azul
- Campos condicionais (aparecem/somem conforme seleção)
- Scroll suave até resultados
- Feedback visual em ações (ex: "Link Copiado!")
- Responsivo e clean

### 📐 Transparência nos Cálculos
- Exibição das equações utilizadas
- Fórmula do TMB/BMR com valores substituídos
- Fórmula do TDEE com multiplicadores
- Descrição dos ajustes aplicados

## 🚀 Como Usar

### 1. Dados Básicos
- Selecione seu **gênero** (Masculino/Feminino)
- Informe **idade**, **peso** e **altura**

### 2. Composição Corporal (Opcional)
- Se souber seu **percentual de gordura**, informe para cálculos mais precisos
- Isso habilitará a fórmula Katch-McArdle e análise de composição

### 3. Nível de Atividade
- Escolha seu nível base de atividade física diária:
  - **Sedentário**: Pouco ou nenhum exercício
  - **Levemente ativo**: Exercício leve 1-3 dias/semana
  - **Moderadamente ativo**: Exercício moderado 3-5 dias/semana
  - **Muito ativo**: Exercício intenso 6-7 dias/semana
  - **Extremamente ativo**: Exercício muito intenso, trabalho físico

### 4. Treinos
- Informe se faz **musculação** e a frequência semanal (1-7 dias)
- Informe se faz **cardio** e a frequência semanal (1-7 dias)

### 5. Objetivo
- Escolha entre **Cutting** (perder gordura), **Bulking** (ganhar massa) ou **Manter peso**
- Para cutting/bulking, defina o déficit/superávit desejado

### 6. Distribuição de Macros
- Escolha o método de cálculo (gramas/kg ou porcentagens)
- Ajuste conforme suas preferências ou recomendação do nutricionista

### 7. Refeições
- Informe quantas refeições faz por dia (3-6)

### 8. Calcular
- Clique em **"Calcular Macros"**
- Veja todos os resultados, equações, avisos e recomendações
- **Exporte** o resultado para arquivo TXT
- **Copie o link** para salvar ou compartilhar

### 9. Compartilhar/Editar
- O link na URL contém todos os dados do cálculo
- Cole o link em outro navegador para ver/editar os mesmos dados
- Dados também são salvos automaticamente no navegador

## 🛣️ Roadmap de Melhorias

### ✅ Concluído
- [x] Calculadora base de TMB/TDEE com múltiplas fórmulas
- [x] Distribuição de macronutrientes (gramas/kg e porcentagens)
- [x] Persistência via URL e localStorage
- [x] Export para TXT e compartilhamento
- [x] Validações nutricionais e avisos
- [x] Interface responsiva e intuitiva
- [x] Transparência nas equações
- [x] Branding Cia da Saúde (logo, fonts, cores)
- [x] Compartilhamento via WhatsApp
- [x] PWA básico (manifest, favicon)
- [x] Meta tags SEO e Open Graph
- [x] Deploy no Vercel

---

### 🎯 Curto Prazo (1-2 semanas)
**Visualização e UX**
- [ ] **Gráfico de macros** - Pizza/barras mostrando distribuição de proteínas, carbos e gorduras
- [ ] **Modo escuro** - Toggle para tema claro/escuro com persistência
- [ ] **Impressão otimizada** - CSS @media print para gerar resultados em PDF via navegador
- [ ] **Animações suaves** - Transições fade-in nos resultados, hover effects melhorados
- [ ] **Tooltips explicativos** - Ícones (?) com dicas contextuais em cada campo

**Dados e Histórico**
- [ ] **Histórico local** - Salvar últimos 10 cálculos com data/hora
- [ ] **Comparador de cenários** - Visualizar 2-3 configurações lado a lado
- [ ] **Tags/nomes** - Nomear cálculos ("Cutting Verão", "Bulking Inverno")

---

### 🔧 Médio Prazo (1-3 meses)
**Planejamento Alimentar**
- [ ] **Sugestões de alimentos** - Lista de fontes proteicas, carbos e gorduras por macro
- [ ] **Base TACO** - Integrar tabela brasileira de composição de alimentos
- [ ] **Montador de refeições** - Drag & drop de alimentos para montar prato
- [ ] **Calculadora reversa** - "Tenho 600 kcal disponíveis, distribua os macros"
- [ ] **Scanner de rótulos** - OCR para ler informações nutricionais de embalagens

**Progressão e Metas**
- [ ] **Calculadora de tempo** - "Para atingir 75kg, levar X semanas"
- [ ] **Ajuste progressivo** - Planejar redução/aumento gradual de calorias (ex: -50 kcal/semana)
- [ ] **Ciclos de cutting/bulking** - Templates de 4-12 semanas com ajustes automáticos
- [ ] **Rastreamento de progresso** - Gráficos de evolução de peso, medidas e fotos

**Treino e Gasto Calórico**
- [ ] **Calculadora de exercícios** - Estimar queima calórica por atividade/duração
- [ ] **Periodização de carbos** - Ciclar carbos em dias de treino vs descanso
- [ ] **Timing nutricional** - Sugestões de janela pré/pós treino

---

### 🚀 Longo Prazo (3-6 meses)
**Backend e Nuvem**
- [ ] **Sistema de contas** - Firebase/Supabase para salvar dados na nuvem
- [ ] **Sincronização multi-device** - Acessar de qualquer lugar
- [ ] **API REST** - Expor funcionalidades para apps externos
- [ ] **Backup automático** - Export periódico para Google Drive/Dropbox

**Integrações Externas**
- [ ] **Balança inteligente** - Sync com Xiaomi, Fitbit, etc
- [ ] **Apps de treino** - Integrar com Strava, MyFitnessPal, Strong
- [ ] **Wearables** - Apple Watch, Garmin para TDEE real
- [ ] **Google Fit / Apple Health** - Sincronizar peso e atividades

**Recursos Cia da Saúde**
- [ ] **Calculadora de suplementos** - Doses recomendadas de whey, creatina, etc
- [ ] **Catálogo de produtos** - Link para suplementos da loja
- [ ] **Agendamento integrado** - Agendar consulta nutricional direto da calculadora
- [ ] **Cupons dinâmicos** - Gerar desconto para primeira consulta
- [ ] **Programa de pontos** - Gamificação para engajamento

---

### 🧪 Recursos Avançados
**Dietas Específicas**
- [ ] **Cetogênica** - Preset low-carb (<50g/dia)
- [ ] **Vegetariana/Vegana** - Fontes de proteína vegetal
- [ ] **Paleo** - Restrições e sugestões
- [ ] **Jejum intermitente** - Calcular janelas alimentares (16/8, 20/4, etc)
- [ ] **IIFYM** - Flexibilidade com "fits your macros"

**Análise Avançada**
- [ ] **Micronutrientes** - Calcular vitaminas e minerais
- [ ] **Bioimpedância** - Interpretar dados de balanças de composição corporal
- [ ] **NEAT estimado** - Calcular termogênese não-exercício
- [ ] **TEF** - Efeito térmico dos alimentos
- [ ] **Refeição livre** - Calcular impacto de cheat meal no déficit semanal

**IA e Personalização**
- [ ] **Ajuste automático** - IA sugere mudanças baseado em progresso semanal
- [ ] **Chatbot nutricional** - Responder dúvidas comuns
- [ ] **Reconhecimento de fotos** - Estimar calorias de prato fotografado
- [ ] **Previsão de resultado** - ML para estimar composição corporal em X semanas

---

### 📱 UX/UI
- [ ] **Onboarding interativo** - Tour guiado na primeira visita
- [ ] **Wizard passo-a-passo** - Formulário em etapas com validação
- [ ] **Temas personalizáveis** - Escolher paleta de cores
- [ ] **Acessibilidade WCAG 2.1 AA** - Screen readers, contraste, teclado
- [ ] **Multi-idioma** - PT-BR, EN, ES
- [ ] **Notificações push** - Lembretes de refeições/hidratação
- [ ] **Modo offline completo** - Service Worker com cache avançado

---

### 🔒 Infraestrutura e Qualidade
- [ ] **Testes automatizados** - Jest (unit), Cypress (e2e)
- [ ] **CI/CD** - GitHub Actions para deploy automático
- [ ] **Monitoramento** - Google Analytics + Sentry para erros
- [ ] **Performance** - Lighthouse 90+ em todas métricas
- [ ] **SEO avançado** - Schema.org, sitemap, robots.txt
- [ ] **CDN** - Cloudflare para cache global
- [ ] **Rate limiting** - Proteção contra abuso de API

---

### 🌟 Ideias Futuras
- [ ] **App mobile nativo** - React Native ou Flutter
- [ ] **Extensão de navegador** - Quick calculator na toolbar
- [ ] **Comunidade** - Fórum para compartilhar planos e dicas
- [ ] **Marketplace de nutricionistas** - Conectar usuários com profissionais
- [ ] **Desafios gamificados** - "30 dias de cutting", badges, rankings
- [ ] **Análise de sangue** - Interpretar exames laboratoriais
- [ ] **Receitas customizadas** - Gerar receitas que se encaixam nos macros

---

### 🏋️ Funcionalidades Inspiradas em Apps Profissionais

**Banco de Alimentos Brasileiro**
- [ ] Base TACO/IBGE: busca e seleção de alimentos nacionais
- [ ] Montagem automática de refeições para atingir macros

**Planejamento de Treinos**
- [ ] Divisão de treinos: musculação, cardio, HIIT, grupos musculares
- [ ] Sugestão de treinos: templates para iniciantes, intermediários, avançados
- [ ] Controle de sessões: registrar treinos realizados e progresso

**Evolução e Relatórios**
- [ ] Histórico de peso, medidas e fotos
- [ ] Gráficos de evolução: peso, medidas, calorias, macros
- [ ] Relatórios semanais/mensais: resumo do progresso

**Cardápio Personalizado**
- [ ] Sugestão automática de refeições: café, almoço, jantar, lanches
- [ ] Ajuste dinâmico de cardápio: troca de alimentos mantendo macros

**Suplementação**
- [ ] Sugestão de suplementos: integrar catálogo da loja (Cia da Saúde)
- [ ] Calculadora de doses: whey, creatina, cafeína, etc

**Compartilhamento e Comunidade**
- [ ] Compartilhar planos: enviar dieta/treino por link, WhatsApp, PDF
- [ ] Receber feedback: avaliação de planos por profissionais

**Conta de usuário (opcional)**
- [ ] Login/salvar na nuvem: sincronizar dados entre dispositivos

## 🧰 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Gradientes, Flexbox, Grid
- **JavaScript (ES6+)**: Vanilla JS puro
- **Web APIs**: 
  - LocalStorage
  - URLSearchParams
  - Clipboard API
  - Blob API
  - History API

## 📊 Fórmulas Utilizadas

### Mifflin-St Jeor (sem % gordura)
```
Homens: TMB = (10 × peso) + (6.25 × altura) - (5 × idade) + 5
Mulheres: TMB = (10 × peso) + (6.25 × altura) - (5 × idade) - 161
```

### Katch-McArdle (com % gordura)
```
TMB = 370 + (21.6 × massa magra em kg)
Massa magra = peso × (1 - % gordura/100)
```

### TDEE
```
TDEE = TMB × multiplicador de atividade + ajustes de treino
```

### Multiplicadores de Atividade
- Sedentário: 1.2
- Levemente ativo: 1.375
- Moderadamente ativo: 1.55
- Muito ativo: 1.725
- Extremamente ativo: 1.9

### Ajustes de Treino
- Musculação: +30 kcal por sessão
- Cardio: +70 kcal por sessão

## 📝 Notas Importantes

⚠️ **Esta calculadora é uma ferramenta educacional e de planejamento**. Consulte sempre um nutricionista ou médico antes de fazer mudanças significativas na dieta.

💡 **Os valores são estimativas**. O metabolismo varia entre indivíduos. Ajuste as calorias baseado nos resultados reais ao longo das semanas.

🎯 **Seja consistente**. Mudanças na composição corporal levam tempo. Dê pelo menos 2-4 semanas antes de fazer ajustes.

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e pessoais.

---

**Desenvolvido com ❤️ para auxiliar no seu objetivo fitness**
