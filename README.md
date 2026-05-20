Oh! The interactive widget isn't loading for you. Let me just give you everything as plain text right here — all 26 programs with explanation.

---

## Q1 — Student Class

```java
public class Student {
    // Static variable - shared by ALL objects
    static String college = "VIT";
    static int count = 0;

    // Instance variables - different for each object
    String name;
    int roll;
    double marks;

    // Static block - runs ONCE when class loads
    static {
        System.out.println("Static block: Class loaded");
    }

    // Instance block - runs EVERY TIME new Student() is called
    {
        count++;
        System.out.println("Instance block: Object #" + count);
    }

    // Default constructor - no parameters
    Student() {
        name = "Unknown";
        roll = 0;
        marks = 0.0;
    }

    // Parameterized constructor - takes values
    Student(String n, int r, double m) {
        this.name = n;
        this.roll = r;
        this.marks = m;
    }

    // Copy constructor - copies another object
    Student(Student s) {
        this.name = s.name;
        this.roll = s.roll;
        this.marks = s.marks;
    }

    // Static method - call as Student.showCollege()
    static void showCollege() {
        System.out.println("College: " + college);
    }

    // Instance method - call as s1.show()
    void show() {
        System.out.println(name + " | Roll: " + roll + " | Marks: " + marks);
    }

    public static void main(String[] args) {
        Student.showCollege();
        Student s1 = new Student();
        Student s2 = new Student("Aarav", 101, 89.5);
        Student s3 = new Student(s2);
        s1.show();
        s2.show();
        s3.show();
        Student.showCollege();
    }
}
```

**Output:**
```
Static block: Class loaded
College: VIT
Instance block: Object #1
Instance block: Object #2
Instance block: Object #3
Unknown | Roll: 0 | Marks: 0.0
Aarav | Roll: 101 | Marks: 89.5
Aarav | Roll: 101 | Marks: 89.5
College: VIT
```

**Explanation:**
- `static String college` → one copy, shared by all students
- `static {}` → runs once, before any object is made
- `{}` (instance block) → runs every time you write `new Student()`
- `this.name = n` → "set MY name to the value n that was passed"
- Copy constructor → copies all values from another Student object
- Static method → called on class name: `Student.showCollege()`
- Instance method → called on object: `s1.show()`

---

## Q2 — Employee Class

```java
public class Employee {
    static String company = "TCS";
    static int count = 0;

    String name;
    double salary;
    String dept;

    static {
        System.out.println("Static block: " + company);
    }

    {
        count++;
        System.out.println("Instance block: Employee #" + count);
    }

    Employee() {
        name = "N/A"; salary = 0; dept = "N/A";
    }

    Employee(String n, double s, String d) {
        this.name = n; this.salary = s; this.dept = d;
    }

    Employee(Employee e) {
        this.name = e.name; this.salary = e.salary; this.dept = e.dept;
    }

    // Method Overloading - same name, different parameters
    void display() {
        System.out.println(name + " | " + dept + " | " + salary);
    }

    void display(String label) {
        System.out.println(label + ": " + name);
    }

    void display(boolean active) {
        if (active) System.out.println("Active Employee: " + name);
    }

    static void showCount() {
        System.out.println("Total employees: " + count);
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Raj", 50000, "IT");
        Employee e2 = new Employee(e1);
        e1.display();
        e1.display("Info");
        e1.display(true);
        Employee.showCount();
    }
}
```

**Output:**
```
Static block: TCS
Instance block: Employee #1
Instance block: Employee #2
Raj | IT | 50000.0
Info: Raj
Active Employee: Raj
Total employees: 2
```

---

## Q3 — Adder (Two Sum)

```java
import java.util.Scanner;

public class Adder {
    int[] data;
    int target;

    Adder() {
        data = new int[0];
        target = 0;
    }

    void getdata() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        data = new int[n];
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) data[i] = sc.nextInt();
        System.out.print("Enter target sum: ");
        target = sc.nextInt();
    }

    int[] numsum() {
        for (int i = 0; i < data.length; i++) {
            for (int j = i + 1; j < data.length; j++) {
                if (data[i] + data[j] == target) {
                    return new int[]{data[i], data[j]};
                }
            }
        }
        return new int[0]; // empty array = no pair found
    }

    public static void main(String[] args) {
        Adder a = new Adder();
        a.getdata();
        int[] r = a.numsum();
        if (r.length == 0) System.out.println("[]");
        else System.out.println("[" + r[0] + ", " + r[1] + "]");
    }
}
```

**Output:**
```
Enter size: 8
Enter elements: 3 5 -4 8 11 1 -1 7
Enter target sum: 15
[8, 7]
```

**Explanation:** Two loops check every pair. `j = i+1` ensures we never pick the same element twice.

---

## Q4 — Finder (Difference Pair)

```java
import java.util.Scanner;

public class Finder {
    int[] data;
    int targetDiff;

    Finder() { data = new int[0]; targetDiff = 0; }

    void getdata() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Size: ");
        int n = sc.nextInt();
        data = new int[n];
        for (int i = 0; i < n; i++) data[i] = sc.nextInt();
        System.out.print("Target difference: ");
        targetDiff = sc.nextInt();
    }

    int[] findPair() {
        for (int i = 0; i < data.length; i++)
            for (int j = i + 1; j < data.length; j++)
                if (Math.abs(data[i] - data[j]) == targetDiff)
                    return new int[]{data[i], data[j]};
        return new int[0];
    }

    public static void main(String[] args) {
        Finder f = new Finder();
        f.getdata();
        int[] r = f.findPair();
        if (r.length == 0) System.out.println("[]");
        else System.out.println("[" + r[0] + ", " + r[1] + "]");
    }
}
```

**Output:**
```
Size: 5
2 6 9 3 11
Target difference: 3
[6, 9]
```

**Explanation:** Same as Q3 but uses `Math.abs(a - b)` instead of `a + b`.

---

## Q5 — Area (Overloading + Inheritance)

```java
import java.util.Scanner;

class Shape {
    double area(double side) {              // square
        return side * side;
    }
    double area(double r, boolean isCircle) { // circle
        return Math.PI * r * r;
    }
    double area(double base, double height) { // triangle
        return 0.5 * base * height;
    }
}

public class AreaCalc extends Shape {
    void calc() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Square side: ");
        System.out.printf("Square area = %.2f%n", area(sc.nextDouble()));
        System.out.print("Circle radius: ");
        System.out.printf("Circle area = %.2f%n", area(sc.nextDouble(), true));
        System.out.print("Triangle base: ");
        double b = sc.nextDouble();
        System.out.print("Triangle height: ");
        System.out.printf("Triangle area = %.2f%n", area(b, sc.nextDouble()));
    }

    public static void main(String[] args) {
        new AreaCalc().calc();
    }
}
```

**Output:**
```
Square side: 5
Square area = 25.00
Circle radius: 7
Circle area = 153.94
Triangle base: 6
Triangle height: 4
Triangle area = 12.00
```

---

## Q6 — Salary (Inheritance)

```java
import java.util.Scanner;

class Employee {
    String name; double basic;
    Employee(String n, double b) { name = n; basic = b; }
    double salary() { return basic; }
    void display() {
        System.out.println(name + " | Basic: " + basic + " | Total: " + salary());
    }
}

class Manager extends Employee {
    double allowance;
    Manager(String n, double b, double a) { super(n, b); allowance = a; }
    double salary() { return basic + allowance; }
    void display() { super.display(); System.out.println("  Allowance: " + allowance); }
}

class Developer extends Employee {
    double bonus;
    Developer(String n, double b, double bo) { super(n, b); bonus = bo; }
    double salary() { return basic + bonus; }
    void display() { super.display(); System.out.println("  Bonus: " + bonus); }
}

public class SalaryCalc {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Manager name, basic, allowance: ");
        Manager m = new Manager(sc.next(), sc.nextDouble(), sc.nextDouble());
        System.out.print("Developer name, basic, bonus: ");
        Developer d = new Developer(sc.next(), sc.nextDouble(), sc.nextDouble());
        m.display();
        d.display();
    }
}
```

**Output:**
```
Manager name, basic, allowance: Raj 50000 10000
Raj | Basic: 50000.0 | Total: 60000.0
  Allowance: 10000.0
Developer name, basic, bonus: Priya 40000 8000
Priya | Basic: 40000.0 | Total: 48000.0
  Bonus: 8000.0
```

---

## Q7 — Student Result + Sort

```java
import java.util.*;

class Marks {
    String name; int[] marks;
    Marks(String n, int[] m) { name = n; marks = m; }
    int total() { int t = 0; for (int x : marks) t += x; return t; }
    double pct() { return (double) total() / marks.length; }
}

class Result extends Marks {
    Result(String n, int[] m) { super(n, m); }
    String grade() {
        double p = pct();
        if (p >= 90) return "A+";
        else if (p >= 75) return "A";
        else if (p >= 60) return "B";
        else if (p >= 50) return "C";
        else return "F";
    }
    void display() {
        System.out.printf("%-10s Total:%-4d Pct:%.1f%% Grade:%s %s%n",
            name, total(), pct(), grade(), grade().equals("F") ? "Fail" : "Pass");
    }
}

public class StudentResult {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("How many students? ");
        int n = sc.nextInt();
        Result[] res = new Result[n];
        for (int i = 0; i < n; i++) {
            System.out.print("Name: "); String nm = sc.next();
            System.out.print("3 subject marks: ");
            int[] m = {sc.nextInt(), sc.nextInt(), sc.nextInt()};
            res[i] = new Result(nm, m);
        }
        Arrays.sort(res, (x, y) -> Double.compare(y.pct(), x.pct()));
        System.out.println("\n--- Result (sorted by %) ---");
        for (Result r : res) r.display();
    }
}
```

**Output:**
```
How many students? 2
Name: Aarav  3 subject marks: 85 90 78
Name: Priya  3 subject marks: 92 88 95
--- Result (sorted by %) ---
Priya      Total:275  Pct:91.7% Grade:A+ Pass
Aarav      Total:253  Pct:84.3% Grade:A  Pass
```

---

## Q8 — Exceptions (divide by zero, array OOB, null pointer)

```java
public class ExceptionDemo {
    public static void main(String[] args) {

        // a) Divide by zero
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("a) Caught: " + e.getMessage());
        } finally {
            System.out.println("   Finally block always runs");
        }

        // b) Array index out of bounds
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("b) Array OOB: " + e.getMessage());
        }

        // c) Null pointer
        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("c) NullPointerException caught!");
        }
    }
}
```

**Output:**
```
a) Caught: / by zero
   Finally block always runs
b) Array OOB: Index 10 out of bounds for length 3
c) NullPointerException caught!
```

---

## Q9 — NumberFormatException, ArithmeticException, FileNotFoundException

```java
import java.io.*;

public class ExceptionDemo2 {
    public static void main(String[] args) {

        // a) NumberFormatException
        try {
            int n = Integer.parseInt("abc"); // "abc" can't become int
        } catch (NumberFormatException e) {
            System.out.println("a) NumberFormat: " + e.getMessage());
        }

        // b) ArithmeticException
        try {
            int r = 5 % 0;
        } catch (ArithmeticException e) {
            System.out.println("b) Arithmetic: " + e.getMessage());
        }

        // c) FileNotFoundException
        try {
            FileReader fr = new FileReader("ghost.txt");
        } catch (FileNotFoundException e) {
            System.out.println("c) FileNotFound: " + e.getMessage());
        }
    }
}
```

**Output:**
```
a) NumberFormat: For input string: "abc"
b) Arithmetic: / by zero
c) FileNotFound: ghost.txt (No such file or directory)
```

---

## Q10 — ClassNotFoundException, IOException, IllegalArgumentException

```java
import java.io.*;

public class ExceptionDemo3 {
    public static void main(String[] args) {

        // a) ClassNotFoundException
        try {
            Class.forName("com.fake.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("a) ClassNotFound: " + e.getMessage());
        } finally {
            System.out.println("   Finally ran");
        }

        // b) IOException
        try {
            BufferedReader br = new BufferedReader(new FileReader("no.txt"));
            br.readLine();
        } catch (IOException e) {
            System.out.println("b) IOException: " + e.getMessage());
        }

        // c) IllegalArgumentException - we throw it manually
        try {
            int age = -5;
            if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
        } catch (IllegalArgumentException e) {
            System.out.println("c) IllegalArg: " + e.getMessage());
        }
    }
}
```

**Output:**
```
a) ClassNotFound: com.fake.Driver
   Finally ran
b) IOException: no.txt (No such file or directory)
c) IllegalArg: Age cannot be negative
```

---

## Q11 — Producer Consumer (2 producers, 1 consumer)

```java
import java.util.*;

class Buffer {
    Queue<Integer> q = new LinkedList<>();
    int capacity = 5;

    synchronized void produce(int item, String name) throws InterruptedException {
        while (q.size() == capacity) {
            System.out.println(name + " waiting - buffer full");
            wait();
        }
        q.add(item);
        System.out.println(name + " produced: " + item);
        notifyAll();
    }

    synchronized void consume() throws InterruptedException {
        while (q.isEmpty()) {
            System.out.println("Consumer waiting - buffer empty");
            wait();
        }
        System.out.println("Consumed: " + q.poll());
        notifyAll();
    }
}

class Producer extends Thread {
    Buffer buf; String name;
    Producer(Buffer b, String n) { buf = b; name = n; }
    public void run() {
        for (int i = 1; i <= 5; i++) {
            try { buf.produce(i, name); Thread.sleep(200); }
            catch (Exception e) {}
        }
    }
}

class Consumer extends Thread {
    Buffer buf;
    Consumer(Buffer b) { buf = b; }
    public void run() {
        for (int i = 1; i <= 10; i++) {
            try { buf.consume(); Thread.sleep(300); }
            catch (Exception e) {}
        }
    }
}

public class PC {
    public static void main(String[] args) {
        Buffer buf = new Buffer();
        new Producer(buf, "P1").start();
        new Producer(buf, "P2").start();
        new Consumer(buf).start();
    }
}
```

---

## Q12 — Bank Account Thread Synchronization

```java
class BankAccount {
    private double balance;
    BankAccount(double b) { balance = b; }

    synchronized void deposit(double amt, String t) {
        balance += amt;
        System.out.printf("%s deposited %.0f | Balance: %.0f%n", t, amt, balance);
    }

    synchronized void withdraw(double amt, String t) {
        if (amt > balance) System.out.println(t + " - Insufficient!");
        else {
            balance -= amt;
            System.out.printf("%s withdrew %.0f | Balance: %.0f%n", t, amt, balance);
        }
    }
}

public class BankSync {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(1000);
        Thread t1 = new Thread(() -> { acc.deposit(500, "T1"); acc.withdraw(200, "T1"); });
        Thread t2 = new Thread(() -> { acc.deposit(300, "T2"); acc.withdraw(800, "T2"); });
        t1.start();
        t2.start();
    }
}
```

---

## Q13 — 4 Threads

```java
public class FourThreads {
    public static void main(String[] args) {

        Thread t1 = new Thread(() -> {
            System.out.print("T1(1-10): ");
            for (int i = 1; i <= 10; i++) System.out.print(i + " ");
            System.out.println();
        });

        Thread t2 = new Thread(() -> {
            System.out.print("T2(10-1): ");
            for (int i = 10; i >= 1; i--) System.out.print(i + " ");
            System.out.println();
        });

        Thread t3 = new Thread(() -> {
            System.out.print("T3(even): ");
            for (int i = 2; i <= 10; i += 2) System.out.print(i + " ");
            System.out.println();
        });

        Thread t4 = new Thread(() -> {
            System.out.print("T4(odd):  ");
            for (int i = 1; i <= 10; i += 2) System.out.print(i + " ");
            System.out.println();
        });

        t1.start(); t2.start(); t3.start(); t4.start();
    }
}
```

---

## Q14 — Collections

```java
import java.util.*;

public class CollDemo {
    public static void main(String[] args) {

        // ArrayList
        ArrayList<String> list = new ArrayList<>();
        list.add("Apple"); list.add("Banana"); list.add("Cherry");
        list.remove("Banana");
        System.out.println("ArrayList: " + list);
        System.out.println("Contains Apple? " + list.contains("Apple"));
        for (String s : list) System.out.print(s + " ");

        // Vector
        System.out.println();
        Vector<Integer> vec = new Vector<>();
        vec.add(10); vec.add(20); vec.add(30);
        vec.remove(Integer.valueOf(20));
        System.out.println("Vector: " + vec);

        // HashMap
        HashMap<Integer, String> map = new HashMap<>();
        map.put(1, "One"); map.put(2, "Two"); map.put(3, "Three");
        map.remove(2);
        System.out.println("Get key 1: " + map.get(1));
        for (Map.Entry<Integer, String> e : map.entrySet())
            System.out.print(e.getKey() + "=" + e.getValue() + " ");

        // HashSet
        System.out.println();
        HashSet<String> set = new HashSet<>();
        set.add("Dog"); set.add("Cat"); set.add("Dog"); // duplicate ignored
        set.remove("Cat");
        System.out.println("Set: " + set);
        System.out.println("Contains Dog? " + set.contains("Dog"));
    }
}
```

**Output:**
```
ArrayList: [Apple, Cherry]
Contains Apple? true
Apple Cherry
Vector: [10, 30]
Get key 1: One
1=One 3=Three
Set: [Dog]
Contains Dog? true
```

---

## Q15 — JDBC Student Results

```java
import java.sql.*;

public class StudentJDBC {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb", "root", "password");
            Statement stmt = con.createStatement();

            stmt.execute("CREATE TABLE IF NOT EXISTS results(" +
                "id INT PRIMARY KEY, name VARCHAR(50), marks INT, grade VARCHAR(3))");
            stmt.execute("INSERT INTO results VALUES(1,'Aarav',89,'')");
            stmt.execute("INSERT INTO results VALUES(2,'Priya',92,'')");

            ResultSet rs = stmt.executeQuery("SELECT * FROM results");
            while (rs.next()) {
                int m = rs.getInt("marks");
                String g = m >= 90 ? "A+" : m >= 75 ? "A" : "B";
                stmt.execute("UPDATE results SET grade='" + g + "' WHERE id=" + rs.getInt("id"));
                System.out.println(rs.getString("name") + " | Marks: " + m + " | Grade: " + g);
            }
            con.close();
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

---

## Q16 — JDBC Banking System

```java
import java.sql.*;

public class BankJDBC {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bankdb", "root", "password");
            Statement stmt = con.createStatement();

            stmt.execute("CREATE TABLE IF NOT EXISTS accounts(" +
                "id INT PRIMARY KEY, name VARCHAR(50), balance DOUBLE)");
            stmt.execute("INSERT INTO accounts VALUES(1,'Aarav',10000)");
            stmt.execute("UPDATE accounts SET balance=balance+5000 WHERE id=1");
            stmt.execute("UPDATE accounts SET balance=balance-2000 WHERE id=1");

            ResultSet rs = stmt.executeQuery("SELECT * FROM accounts");
            while (rs.next())
                System.out.println(rs.getInt("id") + " | " +
                    rs.getString("name") + " | Balance: " + rs.getDouble("balance"));
            con.close();
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

---

## Q17 — JDBC Attendance

```java
import java.sql.*;

public class AttendanceJDBC {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/school", "root", "password");
            Statement stmt = con.createStatement();

            stmt.execute("CREATE TABLE IF NOT EXISTS attendance(" +
                "id INT, name VARCHAR(50), present INT, total INT)");
            stmt.execute("INSERT INTO attendance VALUES(1,'Aarav',22,25)");
            stmt.execute("INSERT INTO attendance VALUES(2,'Priya',18,25)");
            stmt.execute("INSERT INTO attendance VALUES(3,'Dev',24,25)");

            ResultSet rs = stmt.executeQuery(
                "SELECT *, (present*100.0/total) AS pct FROM attendance");
            System.out.println("--- Attendance Report ---");
            while (rs.next()) {
                double pct = rs.getDouble("pct");
                System.out.printf("%s: %.1f%% - %s%n",
                    rs.getString("name"), pct, pct >= 75 ? "Eligible" : "Not Eligible");
            }
            con.close();
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

---

## Q18 — Bank Account (Interface + Inheritance)

```java
interface BankOps {
    void deposit(double amt);
    void withdraw(double amt);
    void display();
}

class BankAccount implements BankOps {
    String acc, name; double bal;
    BankAccount(String ac, String n, double b) { acc = ac; name = n; bal = b; }
    public void deposit(double a) { bal += a; System.out.println("Deposited: " + a); }
    public void withdraw(double a) {
        if (a > bal) System.out.println("Insufficient!");
        else { bal -= a; System.out.println("Withdrawn: " + a); }
    }
    public void display() { System.out.println(acc + " | " + name + " | Balance: " + bal); }
}

class SavingsAccount extends BankAccount {
    double rate;
    SavingsAccount(String ac, String n, double b, double r) { super(ac, n, b); rate = r; }
    void addInterest() {
        double interest = bal * rate / 100;
        bal += interest;
        System.out.println("Interest added: " + interest);
    }
    public void display() { super.display(); System.out.println("  Rate: " + rate + "%"); }
}

public class BankDemo {
    public static void main(String[] args) {
        SavingsAccount sa = new SavingsAccount("SB01", "Aarav", 10000, 5);
        sa.display();
        sa.deposit(5000);
        sa.withdraw(2000);
        sa.addInterest();
        sa.display();
    }
}
```

---

## Q19 — GUI File Read/Write

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;

public class FileGUI extends JFrame implements ActionListener {
    JTextArea ta = new JTextArea(10, 40);
    JTextField tf = new JTextField(25);
    JButton rd = new JButton("Read"), wr = new JButton("Write");
    String file = "data.txt";

    FileGUI() {
        setTitle("File GUI"); setSize(520, 420);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        add(new JScrollPane(ta), BorderLayout.CENTER);
        JPanel p = new JPanel();
        p.add(tf); p.add(rd); p.add(wr);
        add(p, BorderLayout.SOUTH);
        rd.addActionListener(this); wr.addActionListener(this);
        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == rd) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                ta.setText("");
                String line;
                while ((line = br.readLine()) != null) ta.append(line + "\n");
            } catch (Exception ex) { ta.setText("File not found!"); }
        } else {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
                bw.write(tf.getText()); bw.newLine(); tf.setText("");
            } catch (Exception ex) { ex.printStackTrace(); }
        }
    }

    public static void main(String[] args) { new FileGUI(); }
}
```

---

## Q20 — GUI Calculator

```java
import javax.swing.*;
import java.awt.*;

public class Calculator extends JFrame {
    JTextField disp = new JTextField(20);
    String[] btns = {"7","8","9","/","4","5","6","*","1","2","3","-","0","C","=","+"};
    double n1; String op = "";

    Calculator() {
        setTitle("Calculator"); setSize(280, 350);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        disp.setEditable(false);
        add(disp, BorderLayout.NORTH);
        JPanel p = new JPanel(new GridLayout(4, 4, 5, 5));
        for (String s : btns) {
            JButton b = new JButton(s);
            b.addActionListener(e -> {
                String t = disp.getText(), cmd = e.getActionCommand();
                if (cmd.equals("C")) { disp.setText(""); op = ""; n1 = 0; }
                else if ("+-*/".contains(cmd)) { n1 = Double.parseDouble(t); op = cmd; disp.setText(""); }
                else if (cmd.equals("=")) {
                    double n2 = Double.parseDouble(t);
                    double r = op.equals("+") ? n1+n2 : op.equals("-") ? n1-n2 : op.equals("*") ? n1*n2 : n1/n2;
                    disp.setText(String.valueOf(r)); op = "";
                } else disp.setText(t + cmd);
            });
            p.add(b);
        }
        add(p, BorderLayout.CENTER);
        setVisible(true);
    }

    public static void main(String[] args) { new Calculator(); }
}
```

---

## Q21 — GUI Login Form

```java
import javax.swing.*;
import java.awt.*;

public class LoginForm extends JFrame {
    JTextField userF = new JTextField(15);
    JPasswordField passF = new JPasswordField(15);
    JLabel msg = new JLabel(" ");

    LoginForm() {
        setTitle("Login"); setSize(350, 220);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new GridLayout(4, 2, 10, 10));
        setLocationRelativeTo(null);
        add(new JLabel("Username:")); add(userF);
        add(new JLabel("Password:")); add(passF);
        JButton login = new JButton("Login");
        JButton reset = new JButton("Reset");
        add(login); add(reset);
        add(msg); add(new JLabel());

        login.addActionListener(e -> {
            String u = userF.getText();
            String p = String.valueOf(passF.getPassword());
            if (u.equals("admin") && p.equals("1234")) {
                msg.setForeground(Color.GREEN.darker());
                msg.setText("Login Successful!");
            } else {
                msg.setForeground(Color.RED);
                msg.setText("Invalid credentials!");
            }
        });

        reset.addActionListener(e -> { userF.setText(""); passF.setText(""); msg.setText(" "); });
        setVisible(true);
    }

    public static void main(String[] args) { new LoginForm(); }
}
```

---

## Q22 — Lambda StringOperation

```java
@FunctionalInterface
interface StringOperation { String operate(String s); }

public class StringLambda {
    static String apply(String s, StringOperation op) { return op.operate(s); }

    public static void main(String[] args) {
        StringOperation upper   = s -> s.toUpperCase();
        StringOperation lower   = s -> s.toLowerCase();
        StringOperation reverse = s -> new StringBuilder(s).reverse().toString();
        StringOperation length  = s -> "Length: " + s.length();

        System.out.println(apply("Hello", upper));
        System.out.println(apply("Hello", lower));
        System.out.println(apply("Hello", reverse));
        System.out.println(apply("Hello", length));
    }
}
```

**Output:**
```
HELLO
hello
olleH
Length: 5
```

---

## Q23 — Lambda MathOperation

```java
@FunctionalInterface
interface MathOperation { int operate(int a, int b); }

public class LambdaDemo {
    static int apply(int a, int b, MathOperation op) { return op.operate(a, b); }

    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        MathOperation sub = (a, b) -> a - b;
        MathOperation mul = (a, b) -> a * b;
        MathOperation div = (a, b) -> a / b;

        System.out.println("Addition of 10 and 5 = "      + apply(10, 5, add));
        System.out.println("Subtraction of 10 and 5 = "   + apply(10, 5, sub));
        System.out.println("Multiplication of 10 and 5 = "+ apply(10, 5, mul));
        System.out.println("Division of 10 and 5 = "      + apply(10, 5, div));
    }
}
```

**Output:**
```
Addition of 10 and 5 = 15
Subtraction of 10 and 5 = 5
Multiplication of 10 and 5 = 50
Division of 10 and 5 = 2
```

---

## Q24 — Stream API

```java
import java.util.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Aarav", "Priya", "Dev");

        System.out.println("All names:");
        names.stream().forEach(System.out::println);

        System.out.println("Starts with A:");
        names.stream().filter(n -> n.startsWith("A")).forEach(System.out::println);

        System.out.println("Uppercase:");
        names.stream().map(String::toUpperCase).forEach(System.out::println);

        long count = names.stream().filter(n -> n.length() > 4).count();
        System.out.println("Count with >4 chars: " + count);

        System.out.println("Sorted:");
        names.stream().sorted().forEach(System.out::println);
    }
}
```

---

## Q25 — Interface Default and Static Methods

```java
interface Greeting {
    default void defaultGreeting() { System.out.println("Hello!"); }
    static void staticGreet()      { System.out.println("Welcome to Java 8!"); }
    void customGreeting(String name); // abstract - must implement
}

class FriendlyGreeter implements Greeting {
    public void customGreeting(String name) {
        System.out.println("Hey " + name + "! Great to meet you!");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        FriendlyGreeter g = new FriendlyGreeter();
        g.defaultGreeting();        // default method on object
        Greeting.staticGreet();     // static on interface name
        g.customGreeting("Aarav"); // abstract, implemented in class
    }
}
```

**Output:**
```
Hello!
Welcome to Java 8!
Hey Aarav! Great to meet you!
```

---

## Q26 — Optional Class

```java
import java.util.Optional;

public class OptionalDemo {
    static void getLength(String str) {
        Optional<String> opt = Optional.ofNullable(str);
        if (opt.isPresent())
            System.out.println("Length: " + opt.get().length());
        else
            System.out.println("Value is empty");
    }

    public static void main(String[] args) {
        getLength("Java");   // has value
        getLength(null);     // null
        getLength("Hello World");
    }
}
```

**Output:**
```
Length: 4
Value is empty
Length: 11
```

---

All 26 programs are now here as plain text — scroll up to find any one you need. Ask me to explain any specific program in more detail and I'll break it down line by line for you!
