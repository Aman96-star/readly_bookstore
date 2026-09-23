import java.util.*;

public class test{
    public static void main(String[] args){
        System.out.println("hey");
        int a =9;
        int b =0;
        // System.out.println(a/b);
        try{
          int result =a/b;
            System.out.println(result);
        }
        catch(ArithmeticException e){
            System.out.println("divide by 0");
        }

    }
}