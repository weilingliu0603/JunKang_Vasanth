from flask import *
import sqlite3
app = Flask(__name__)
db = "jpjc.db"
types = ["Cut (Short)", "Cut (Medium)", "Cut (Long)", "Perm", "Colour", "Rebonding", "Highlight (Half Head)", "Highlight (Full Head)", "Treatment"]

def addinvoiceservice(inv,services):
    print(inv, services)
    con = sqlite3.connect(db)
    cur = con.cursor()
    # cur.execute("SELECT SERVICETYPE FROM SERVICE")
    # types = cur.fetchall()
    service = []
    for i in range(len(services)):
        # print(services[i])
        if services[i] == "1":
            service.append(types[i])
    # print(inv[0])
    for i in service:
        # print(i)
        # print(inv)
        con.execute("INSERT INTO INVOICESERVICE VALUES (?,?)",(int(inv[0]),i))
    con.commit()
    con.close()
    return

def getname(id):
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT MEMBERNAME FROM MEMBER WHERE MEMBERID="+str(id))
    name = cur.fetchall()[0]
    con.close()
    return name

def getprices():
    con = sqlite3.connect(db)
    cur = con.cursor()
    price = []
    for i in types:
        print(i)
        print(price, cur.execute("SELECT PRICE FROM SERVICE WHERE SERVICETYPE = ?", [i]).fetchall())
        price.append(cur.execute("SELECT PRICE FROM SERVICE WHERE SERVICETYPE = ?", [i]).fetchall()[0][0])
    # list = cur.fetchall()
    # for i in list:
    #     print(i)
    #     price.append(i[1])
    con.close()
    return price

def computerevenue(rawdata):
    rawdatalist = []
    rev = {}
    rev_c = {}
    for i in rawdata:
        rawdatalist.append(list(i))
    for i in rawdatalist:
        i[0] =i[0][3:]
    for i in rawdatalist:
        if rev.get(i[0]) is not None:
            rev[i[0]] = float(i[1]) + rev.get(i[0])
            rev_c[i[0]] +=1
        else:
            rev[i[0]] = float(i[1])
            rev_c[i[0]] = 1
    month = []
    year = []
    sale = []
    money = []
    for i in rev:
        money.append("$" + str("{:.2f}".format(rev[i])))
        sale.append(rev_c[i])
        i= i.split('/')
        month.append(i[0])
        year.append(i[1])

    finaldata=[]
    for i in range(len(month)):
        finaldata.append([month[i],year[i],sale[i],money[i]])
    
    
    return finaldata

def grossprice(order):
    listprice = getprices()
    print("lp",listprice, order)
    GP = 0
    for i in range(len(order)):
        if order[i]=="1":
            GP+=listprice[i]
    print(GP)
    return GP

def getinvoiceid():
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT seq FROM sqlite_sequence WHERE name = 'INVOICE'")
    id = (int(cur.fetchall()[0][0]) + 1,)
    con.close()
    return id

def getmemberdata():
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT MEMBERID,GENDER,PHONE,MEMBERNAME,MEMBERSHIP FROM MEMBER")
    data= cur.fetchall()
    con.close()
    return data

def nextmemberid():
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT count(*) FROM MEMBER")
    id = cur.fetchall()[0][0]
    id+=1
    con.close()
    return id

def addmember(val):
    connect = sqlite3.connect('jpjc.db')
    cursor = connect.cursor()
    cursor.execute("INSERT INTO MEMBER VALUES (?,?,?,?,?,?,?)",val )
    connect.commit()
    connect.close()
    return 

def editMember2(val):
    connect = sqlite3.connect('jpjc.db')
    cursor = connect.cursor()
    cursor.execute("UPDATE MEMBER SET MEMBERNAME = ?, GENDER = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, MEMBERSHIP = ? WHERE MEMBERID = ?", val)
    connect.commit()
    connect.close()
    return 

def getFinalDataForMemberTransactionHistory(id): # the last index of each list is whether the transaction had a discount. 2 means yes, 1 means no.
    # print(id)
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT INVOICE.INVOICEID,INVOICE.DATE_,INVOICESERVICE.SERVICETYPE,INVOICE.TOTALPRICE,INVOICE.DISCOUNT FROM INVOICE,INVOICESERVICE WHERE INVOICE.MEMBERID = ? AND INVOICE.INVOICEID = INVOICESERVICE.INVOICEID", (id,))
    data = cur.fetchall()
    con.close
    actualFinalData = []
    for i in range(len(data)):
        exist = False
        for j in range(len(actualFinalData)):
            if data[i][0] == actualFinalData[j][0]:
                exist = True
                break
        if exist:
            actualFinalData[j][2] += ", " + data[i][2]
        else:
            actualFinalData.append(list(data[i]))
            actualFinalData[-1][-2] = "$" + "{:.2f}".format(float(actualFinalData[-1][-2]))
            if float(data[i][-1]) == 0.0:
                actualFinalData[-1][-1] = "1"
            else:
                actualFinalData[-1][-1] = "2"
    actualFinalData.reverse()
    return actualFinalData

def getNewTransactionID():
    #Insert select from database for next id of transaction/invoice
    return getinvoiceid()[0]

@app.route("/", methods = ["POST", "GET"])
def index():

    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT DATE_,TOTALPRICE FROM INVOICE")
    rawdata = cur.fetchall()
    con.close()
    finalData = computerevenue(rawdata)
    finalDataLength = len(finalData)
    sum = 0
    addition = ""
    if redirect == 1:
        addition = "New member successfully added!"
    for i in finalData:
        sum += float(i[3][1:])
    sum = "$" + str("{:.2f}".format(sum))
    finalData.reverse()
    return render_template("index.html", finalData = finalData, finalDataLength = finalDataLength, sum = sum, addition = addition)

@app.route("/transactions", methods = ["POST", "GET"])
def transactions(redirect = 0): #add successfully added new tx
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT INVOICE.INVOICEID, INVOICE.DATE_, INVOICE.MEMBERID, INVOICESERVICE.SERVICETYPE, INVOICE.TOTALPRICE, MEMBER.MEMBERSHIP, INVOICE.NAME FROM INVOICE,MEMBER,INVOICESERVICE WHERE ((MEMBER.MEMBERID = INVOICE.MEMBERID AND INVOICE.MEMBERID > 0) OR INVOICE.MEMBERID = 0) AND INVOICE.INVOICEID = INVOICESERVICE.INVOICEID")
    finalData = cur.fetchall()
    trueFinalData = []
    for i in range(len(finalData)):
        inside = False
        for j in range(len(trueFinalData)):
            if finalData[i][0] == trueFinalData[j][0]:
                inside = True
                break
        if inside:
            if finalData[i][3] not in trueFinalData[j][3]:
                trueFinalData[j][3] += ", " + finalData[i][3]
                # trueFinalData[j][4] = "$" + "{:.2f}".format(float(trueFinalData[j][4][1:]) + finalData[i][4])
        else:
            trueFinalData.append(list(finalData[i]))
            trueFinalData[-1][4] = "$" + "{:.2f}".format(float(trueFinalData[-1][4]))
            if trueFinalData[-1][2] == 0:
                trueFinalData[-1][2] = finalData[i][-1]
                trueFinalData[-1][-2] = 3
    trueFinalData.reverse()
    print(finalData)
    print(trueFinalData)
    con.close()
    return render_template("transactions.html", finalData = trueFinalData, redirect = redirect)

@app.route("/members", methods = ["POST", "GET"])
def members(redirect = 0): #insert SELECT final data
    finalData = getmemberdata()
    data = []
    for i in finalData:
        data.append(list(i))
    for i in data:
        if i[4] == 2:
            i[4] ="Gold"
        elif i[4] == 1:
            i[4]="Regular"
    finalData = data
    # print(finalData)
    return render_template("members.html", finalData = finalData, redirect = redirect)

@app.route("/new-transaction", methods = ["GET"])
def newTransaction():
    newTransactionID = getNewTransactionID()
    return render_template("new-transaction.html", newTransactionID = newTransactionID, errorValues = "False,False,False,False,False,False,False,False,False,False,False,False,False", invisible1Value = "0,0", invisible2Value = "0,0,0,0,0,0,0,0,0")

@app.route("/new-transaction", methods = ["POST"])
def newTransactionCheck():
    data = request.form
    # print(data)
    errors = [False for i in range(13)]
    date = data["date"]
    errors[0] = True
    if len(date) >= 8: #date check
        date = date.split("/")
        if len(date) == 3:
            try:
                for i in range(3):
                    int(date[i])
            except:
                pass
            else:
                if int(date[0]) >= 1 and int(date[0]) <= 31 and int(date[1]) >= 1 and int(date[1]) <= 12: #lazy range check, doesn't check for invalid 31st of months, 29-31st for Feb and leap years.
                    errors[0] = False
    if len(data["ID"]) == 0: #Name/ID Check #Insert add check for valid id submitted
        errors[3] = True
    # print(data["invisible1"][2])
    if str(data["invisible1"][2]) == "0":
        try:
            int(data["ID"])
        except:
            errors[3] = True
    else:
        try:
            int(data["ID"])
        except:
            pass
        else:
            errors[3] = True
    breaked = False #Check for minimum one selected
    for i in data["invisible2"]:
        if i == "1":
            breaked = True
            break
    if not breaked:
        for i in range(4, 13):
            errors[i] = True
    # print(errors)
    newTransactionID = getNewTransactionID()
    errorString = ""
    for i in errors:
        errorString += str(i) + ","
    if True in errors:
        return render_template("new-transaction.html", newTransactionID = newTransactionID, errorValues = errorString[:-1], inputDateValue = data["date"], inputIDValue = data["ID"], invisible1Value = data["invisible1"], invisible2Value = data["invisible2"])
    dataForDatabase = [data["date"], data["invisible1"][0], data["invisible1"][2], data["ID"], data["invisible2"][0], data["invisible2"][2], data["invisible2"][4], data["invisible2"][6], data["invisible2"][8], data["invisible2"][10], data["invisible2"][12], data["invisible2"][14], data["invisible2"][16]]    #Format for datafordatabase is [Date, Membership, Guest, MemberID/Name, Cut (Short), Cut (Medium), Cut (Long), Perm, Colour, Rebonding, Half Highlight, Full Highlight, Treatment]. All values except Date and MemberID/Name is given as 1 (Selected) or 0 (Unselected)
    #Format for datafordatabase is [Date, Membership, Guest, MemberID/Name, Cut (Short), Cut (Medium), Cut (Long), Perm, Colour, Rebonding, Half Highlight, Full Highlight, Treatment]. All values except Date and MemberID/Name is given as 1 (Selected) or 0 (Unselected)
    #Insert INSERT into Database here. 
    invoiceid = getinvoiceid()
    if dataForDatabase[1]=="0":
        GP = grossprice(dataForDatabase[4:])
        guestdiscount = 0
        TP = GP
        if int(dataForDatabase[2]) == 1:
            addinvoice = [invoiceid[0],0,dataForDatabase[3],dataForDatabase[0],GP,guestdiscount,TP]
        else:
            addinvoice = [invoiceid[0],dataForDatabase[3],getname(dataForDatabase[3])[0],dataForDatabase[0],GP,guestdiscount,TP]
        addinvoiceservice(invoiceid,dataForDatabase[4:])
        con = sqlite3.connect(db)
        cur = con.cursor()
        con.execute("INSERT INTO INVOICE VALUES (?,?,?,?,?,?,?)", addinvoice)
        con.commit()
        con.close()
    else:
        GP = grossprice(dataForDatabase[4:])
        memberdiscount = 10.0
        TP = GP*(0.9)
        addinvoice = [invoiceid[0],dataForDatabase[3],getname(dataForDatabase[3])[0],dataForDatabase[0],GP,memberdiscount,TP]
        addinvoiceservice(invoiceid,dataForDatabase[4:])
        con = sqlite3.connect(db)
        cur = con.cursor()
        con.execute("INSERT INTO INVOICE VALUES (?,?,?,?,?,?,?)", addinvoice)
        con.commit()
        con.close()



    return transactions(1)

@app.route("/new-member", methods = ["GET"]) #still need to code new member number
def newMember():
    
    newMemberID = nextmemberid()
    return render_template("new-member.html", previousInputs = ["", "", "", "", "0/0"], newMemberID = newMemberID)

@app.route("/new-member", methods = ["POST"])
def newMemberCheck():
    data = request.form
    failures = [False, False, False, False, False, False]
    dataIndex = 0
    for i in data:
        if i == "membershipgender": #selection check
            if data[i].split("/")[0] == "0":
                failures[4] = True
            if data[i].split("/")[1] == "0":
                failures[5] = True
        elif len(data[i]) == 0: #length check
            failures[dataIndex] = True
        dataIndex += 1
    if True in failures: #if there are any unmet conditions for check, return same page with data that you have inputted. If not, send back to index.html with passed
        parameterString = ""
        for i in failures:
            parameterString += (str(i) + "/")
        previousInputs = [data["name"], data["email"], data["phone"], data["address"], data["membershipgender"]]
        #Insert select from database for next id of member
        return render_template("new-member.html", failedText = "Invalid Entry. Try again", errorString = parameterString[:len(parameterString) - 1], previousInputs = previousInputs, newMemberID = newMemberID)
    name = data["name"]
    email = data["email"]
    phoneNumber = int(data["phone"])
    address = data["address"]
    membership = 1
    if data["membershipgender"][0] == "2":
        membership = 2
    gender = "M"
    if data["membershipgender"][2] == "2":
        gender = "F"
    # for i in range(50):
        # print(name,gender,email,phoneNumber,address,membership)
    addmember((nextmemberid(),name,gender,email,phoneNumber,address,membership))
    return members(1)

@app.route("/edit-member", methods = ["GET"])
def editMember():
    memberID = request.args.get('id')

    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT MEMBERNAME,EMAIL,PHONE,ADDRESS,MEMBERSHIP,GENDER FROM MEMBER WHERE MEMBERID ="+str(memberID))
    UD = []
    for i in cur.fetchall()[0]:
        UD.append(i)
    con.close()
    UD[2]= str(UD[2])
    finalUserData = UD[:-1] # last index is for two different things. x/y where both x and y is either 1 or 2, where x = 1 represents Regular member, x = 2 represents Gold member, y = 1 is male, y = 2 is female
    if UD[-1] == "M":
        finalUserData[-1] = str(finalUserData[-1]) + "/1"
    else:
        finalUserData[-1] = str(finalUserData[-1]) + "/2"
    # print(finalUserData)
    finalData = getFinalDataForMemberTransactionHistory(memberID)
    return render_template("/edit-member.html", errorString = "False/False/False/False/False/False", previousInputs = finalUserData, finalData = finalData, memberID = memberID)

@app.route("/edit-member", methods = ["POST"])
def editMemberCheck():
    data = request.form
    failures = [False, False, False, False, False, False]
    
    dataIndex = 0
    memberID = 0
    # print(data)
    
    for i in data:
        # print(i)
        if i == "membershipgender": #selection check
            if data[i].split("/")[0] == "0":
                failures[4] = True
            if data[i].split("/")[1] == "0":
                failures[5] = True
        elif i == "memberID":
            memberID = int(data[i])
        elif len(data[i]) == 0: #length check
            failures[dataIndex] = True
        dataIndex += 1
    finalData = getFinalDataForMemberTransactionHistory(memberID)
    previousInputs = [data["name"], data["email"], data["phone"], data["address"], data["membershipgender"]]
    if True in failures: #if there are any unmet conditions for check, return same page with data that you have inputted. If not, send back to index.html with passed
        parameterString = ""
        for i in failures:
            parameterString += (str(i) + "/")
        return render_template("edit-member.html", failedText = "Invalid Entry. Try again", errorString = parameterString[:len(parameterString) - 1], previousInputs = previousInputs, finalData = finalData, memberID = memberID)
    name = data["name"]
    email = data["email"]
    phoneNumber = int(data["phone"])
    address = data["address"]
    membership = 1
    if data["membershipgender"][0] == "2":
        membership = 1
    gender = "M"
    if data["membershipgender"][2] == "2":
        gender = "F"
    editMember2((name, gender, email, phoneNumber, address, membership, memberID))
    return render_template("edit-member.html", failedText = "Data successfully updated!", errorString = "False/False/False/False/False/False", previousInputs = previousInputs, finalData = finalData, memberID = memberID)

if __name__ == "__main__":
    app.run(port = 10264, debug = True)