export class Verify {

  public trim(str){   
    return str.toString().replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');   
  }  

  /**
   * 为空验证
   * @param value stirng
   * @return boolean
   */
  public empty (value:string) : boolean {
    if(value && this.trim(value)!=="" && value.length>0 ) {
      return false;
    }
    return true;
  }

  /**
   * 手机号码验证
   * @param value string
   */
  public phone(value:string) : boolean {
    let phoneReg =/^1[3|4|5|7|8][0-9]\d{8}$/;
    if(phoneReg.test(value)) {
      return true;
    }
    return false;
  }

  /**
   * 电话号码验证
   * @param value string
   */

  public tele(value:string) : boolean {
    let  teleReg = /^((0\d{2,3})-)(\d{7,8})$/;
    if(teleReg.test(value)) {
      return true;
    }
    return false;
  }

  /**
   * 身份证验证
   * @param value string 
   */

  public card(value:string): boolean {
    let cardReg =  /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    if(cardReg.test(value)) {
      return true;
    }
    return false;
  }

  /**
   * 邮编验证
   * @param value string
   */
  public post(value:string): boolean {
    let postReg = /^[1-9][0-9]{5}$/;
    if(postReg.test(value)) {
      return true;
    }
    return false;
  }

  /**
   * 传真验证
   * @param value string
   */
  public fax(value:string): boolean {
    let faxReg = /^(\d{3,4}-)?\d{7,8}$/;
    if(faxReg.test(value)) {
      return true;
    }
    return false;
  }

  /**
   * 邮件验证
   * @param value string
   */
  public email(value:string): boolean {
    let emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if(emailReg.test(value)) {
      return true;
    }
    return false;
  }

  public number(num) {
    var reg = /^(\-|\+)?(\d{1,8})?([\.]\d*)?$/;
    return reg.test(num)

  }
   
}