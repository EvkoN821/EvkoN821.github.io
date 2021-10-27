#include <iostream>
#include <string>
#include <fstream>
#include <Windows.h>

using namespace std;

int main()
{
    ifstream toServer;
    string path_toServer="C:\\toServer.txt";
    ofstream toClient;
    string path_toClient="C:\\toClient.txt";
    ifstream stopFile;
    string path_toStop="C:\\stop.txt";

    ofstream erase_idFile;
    erase_idFile.open("C:\\idFIle.txt", ios::end | ios::trunc);
    erase_idFile.close();

    ofstream erase_toClient;
    erase_toClient.open(path_toClient, ios::end | ios::trunc);
    erase_toClient.close();

    toServer.open(path_toServer, ios::end | ios::trunc);
    toServer.close();

    bool stop = true;
    int grant;
    int type=0;
    long pos;
    long pos_in_str;
    string code1;
    string code2;

    cout << "Server is working now" << endl;

    toServer.open(path_toServer, ios::binary);
    toServer.seekg(0, ios::end);
    pos = toServer.tellg();
    toServer.close();

    while (stop) {
        toServer.open(path_toServer, ios::binary);
        toServer.seekg(0, ios::end);
        while (pos >= toServer.tellg()) {
            Sleep(100);
            toServer.seekg(0, ios::end);
        }
        toServer.seekg(pos, ios::beg);
        toServer.read((char*)&code1, sizeof(code1));
        pos = toServer.tellg();
        toServer.close();

        pos_in_str = code1.find(".");
        code2.append(code1, 0, pos_in_str);
        code1.erase(0, pos_in_str+1);
        grant = stoi(code1);
        code1.erase();

        cout << "I have just get " << grant << " grant from my friend with "<< code2 <<" id.";
        if (grant >= 3000) {
            type = 2;
        }
        else if (grant < 3000 && grant >0) {
            type = 1;
        }
        else if (grant == 0){
            type = 0;
        }

        code2 = code2 + "." + to_string(type);

        toClient.open(path_toClient, ios::app | ios::binary);
        toClient.write((char*)&code2, sizeof(code2));
        toClient.close();
        
        cout << " I have just sent " << code2 << " type to my friend." << endl;
        code2.erase();

        /*stopFile.open(path_toStop);
        stopFile >> stop;
        stopFile.close();*/

    }

    cout << "the end";

}

