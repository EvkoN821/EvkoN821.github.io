#include <iostream>
#include <string>
#include <fstream>
#include <Windows.h>
#include <random>

using namespace std;

struct Node {
    string name;
    int type;
    int grant;
    Node* next;

    Node(string name, int grant) : name(name), type(0), grant(grant), next(nullptr) {};
};

struct List {
    Node* first;
    Node* last;

    List() : first(nullptr), last(nullptr) {}

    bool isEmpty() {
        return first == nullptr;
    }

    void pushBack(string name, int grant) {
        Node* c = new Node(name, grant);
        if (isEmpty()) {
            first = c;
            last = c;
            return;
        }
        last->next = c;
        last = c;
    }

    void printList() {
        if (isEmpty()) {
            return;
        }
        Node* p = first;
        string type_of_grant;
        while (p) {
            switch (p->type) {
            case 0: {
                type_of_grant = "Zero grant.";
                break;
            }
            case 1: {
                type_of_grant = "Standart grant.";
                break;
            }
            case 2: {
                type_of_grant = "Increased grant.";
                break;
            }
            }
            cout << p->name << " " << p->grant << " " << type_of_grant;
            cout << endl;
            p = p->next;
        }
    }
};





int main()
{

    ofstream stopFile;
    string path_toStop = "C:\\stop.txt";

    bool stop = true;
    stopFile.open(path_toStop, ios::end | ios::trunc);
    stopFile << stop;
    stopFile.close();

    
    int prev_id = 0;
    int id;
    ifstream idFileCheck;
    ofstream idFile;
    string path_toIdFile = "C:\\idFile.txt";
    idFileCheck.open(path_toIdFile);
    if (idFileCheck.peek() != EOF) {
        idFileCheck >> prev_id;
    }
    idFileCheck.close();

    idFile.open(path_toIdFile, ios::end | ios::trunc);
    if (prev_id != 0) {
        id = prev_id + 1;
        idFile << id;
    }
    else {
        random_device rd;
        mt19937 mersenne(rd());
        id = mersenne();
        if (id < 0) {
            id *= -1;
        }
        idFile << id;
    }
    idFile.close();
    

    List l;
    while (stop) {
        string answer;
        string name;
        int grant;
        cout << "Input name: ";
        cin >> name;
        cout << "Input grant: ";
        cin >> grant;

        l.pushBack(name, grant);

        // makeReq(id, l.last->grant);
		string path_toServer = "C:\\toServer.txt";
		string req = to_string(id) + "." + to_string(grant);
		ofstream toServer;
		toServer.open(path_toServer, ios::app | ios::binary);
		toServer.write((char*)&req, sizeof(req));
		toServer.close();
		req.erase();

       
		string path_toClient = "C:\\toClient.txt";
		ifstream toClient;
		string answer;
		toClient.open(path_toClient, ios::binary);
		toClient.seekg(0, ios::end);
		long pos = toClient.tellg();
		while (pos >= toClient.tellg()) {
			Sleep(100);
			toClient.seekg(0, ios::end);
		}
		toClient.seekg(pos, ios::beg);

		getline(toClient, answer);
		toClient.close();
		

		long pos_in_str = answer.find(".");
		answer.erase(0, pos_in_str + 1);
		l.last->type = stoi(answer);
        
		switch (l.last->type) {
			case 0: {
				cout << "Zero scholarship.";
				cout << endl;
				break;
			}
			case 1: {
				cout << "Standart grant.";
				cout << endl;
				break;
			}
			case 2: {
				cout << "Increased grant.";
				cout << endl;
				break;
			}
		}

        cout << "Continue? Type 1/0: ";
        cin >> stop;
        cout << endl;
    }

    l.printList();
    return 0;
}
