# Simple-API

## Front End
<img width="1915" height="912" alt="image" src="https://github.com/user-attachments/assets/eb241b3f-cf7a-438d-8b38-45c2df464fe9" />

<img width="1589" height="858" alt="image" src="https://github.com/user-attachments/assets/80a4524e-0e5e-4dc6-b27c-72a12f0b8a24" />

<img width="1104" height="694" alt="image" src="https://github.com/user-attachments/assets/27ac8eab-be52-455c-9401-b1882700cbf5" />

## API

### Lista de Endpoints GET e POST simples:

```java
    @PostMapping
    public Instrument create(@RequestBody InstrumentDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<Instrument> getAll() {
        return service.getAll();
    }


```
### GET:
Método - URL - Body - 

<img width="681" height="854" alt="image" src="https://github.com/user-attachments/assets/a283a264-3e28-4ba7-9651-eaffda2adfe6" />

Resposta:

<img width="679" height="536" alt="image" src="https://github.com/user-attachments/assets/cdecf97e-67fd-4fca-b3f3-f013397b0d7c" />

### POST:

Método - URL - Body - 

<img width="685" height="858" alt="image" src="https://github.com/user-attachments/assets/88c1fe75-85b6-434b-ab29-61bd12e9ee89" />

Requisição:

<img width="678" height="437" alt="image" src="https://github.com/user-attachments/assets/a2656453-ceaa-421b-8ff9-1118c0dba81f" />

Resposta:

<img width="676" height="414" alt="image" src="https://github.com/user-attachments/assets/53f405dc-92a6-41f3-8234-8196a51eec2a" />

### Retornos via Console.log
<img width="1910" height="434" alt="image" src="https://github.com/user-attachments/assets/5cbfd795-88ea-49ba-8aeb-7d3bf52fc2ac" />

### Criação de 5 instrumentos via POST:

<img width="1914" height="154" alt="image" src="https://github.com/user-attachments/assets/1f88de39-8b76-4bb5-8d84-dca1977761d0" />

# Validação:

## Regra do sistema:

```java
public enum InstrumentType {
    CORDA,
    SOPRO,
    PERCURSSAO,
    TECLADO
}
```

## Método

```java
  private InstrumentType parseType(String type) {
    try {
        return InstrumentType.valueOf(type.toUpperCase());
    } catch (Exception ex) {
        throw new ResponseStatusException(BAD_REQUEST, "Invalid instrument type: " + type);
    }
}
```
# Objetivo:
Esta validação garante que o valor(instrumento) informado estaja de acordo com a regra do sistema estabelecida, impedindo
que um objeto inválido entre no sistema

# Como funciona:

1. Recebe uma String (type) como entrada
  
2. Converte o valor para maiúsculo (toUpperCase())
  
3. Tenta mapear o valor para um enum InstrumentType usando valueOf()
  
4. Caso o valor não exista no enum:
  
    Lança uma exceção ResponseStatusException
    
    Retorna status HTTP 400 (BAD_REQUEST)
    
    Informa qual valor foi inválido


